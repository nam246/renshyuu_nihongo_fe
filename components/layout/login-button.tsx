'use client';

import { useCurrentUser } from '@/hooks/use-currentUser';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileDropdown from '@/components/layout/dropdown-profile';

export default function LoginButton() {
	const { user, isLoading, isAuthenticated } = useCurrentUser();

	console.log(user);

	if (!user) {
		return (
			<Button className='rounded-lg max-md:hidden' asChild>
				<Link href='/login'>Login</Link>
			</Button>
		);
	}

	return (
		<ProfileDropdown
			trigger={
				<Button variant='ghost' size='icon' className='size-9.5'>
					<Avatar className='size-9.5 rounded-md'>
						<AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
				</Button>
			}
		/>
	);
}
