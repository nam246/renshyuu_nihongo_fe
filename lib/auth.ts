import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Import database hoặc model User của bạn
// import { getUserByUsername } from "./db";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'your-username',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					throw new Error('Username và password là bắt buộc');
				}

				// Tìm user trong database
				// Ví dụ giả định:
				const user = await getUserByUsername(credentials.username);

				if (!user) {
					throw new Error('Username hoặc password không đúng');
				}

				// Kiểm tra password
				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.hashedPassword,
				);

				if (!isPasswordValid) {
					throw new Error('Username hoặc password không đúng');
				}

				// Trả về user object (sẽ được lưu vào JWT)
				return {
					id: user.id,
					username: user.username,
					email: user.email,
					role: user.role,
				};
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			// Lần đầu đăng nhập, thêm thông tin user vào token
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			// Thêm thông tin từ token vào session
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

// Mock function - thay bằng database thật của bạn
async function getUserByUsername(username: string) {
	// Ví dụ với Prisma:
	// return await prisma.user.findUnique({ where: { username } });

	// Ví dụ mock:
	const users = [
		{
			id: 'c9a0c3c2-b518-41f0-9883-27356bf7d203',
			username: 'admin',
			email: 'admin@example.com',
			hashedPassword: await bcrypt.hash('admin', 10),
			role: 'admin',
		},
	];

	return users.find((u) => u.username === username);
}
