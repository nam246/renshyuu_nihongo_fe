import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
// @ts-ignore
import '@/styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
// import { AuthProvider } from '@/lib/auth-context';
import AuthProviders from '@/components/session-provider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Renshyuu | Practice your ways',
	description:
		'A Web-Based Application for Japanese Language Learning and JLPT Examination Practice',
};

// chắc nên mang header và footer vào page
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthProviders>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<Toaster />
						{/* <Navbar /> */}

						<main>{children}</main>
					</ThemeProvider>
				</AuthProviders>
			</body>
		</html>
	);
}
