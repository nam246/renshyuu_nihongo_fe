import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { default as nextAuthMiddleware } from 'next-auth/middleware';

export default nextAuthMiddleware;

// This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
// 	return NextResponse.redirect(new URL('/login', request.url));
// }

// Alternatively, you can use a default export:
// export function proxy(request: NextRequest) {}

export const config = {
	matcher: [
		'/dashboard/:path*',
		'/add-grammar/:path*',
		'/add-kanji/:path*',
		'/add-question/:path*',
		'/add-vocabulary/:path*',
		'/bookmarked-grammar/:path*',
		'/bookmarked-kanji/:path*',
		'/bookmarked-vocabulary/:path*',
		'/dashboard/:path*',
		'/mock-test-builder/:path*',
	],
};
