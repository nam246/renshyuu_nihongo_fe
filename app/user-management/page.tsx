'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';

const mockUsers = [
	{
		id: 1,
		name: 'Nguyễn Văn A',
		email: 'a@gmail.com',
		role: 'Admin',
		status: 'active',
	},
	{
		id: 2,
		name: 'Trần Thị B',
		email: 'b@gmail.com',
		role: 'User',
		status: 'inactive',
	},
	{
		id: 3,
		name: 'Lê Văn C',
		email: 'c@gmail.com',
		role: 'User',
		status: 'active',
	},
];

export default function UserManagement() {
	const [search, setSearch] = useState('');

	const filteredUsers = mockUsers.filter(
		(u) =>
			u.name.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<>
			{/* Header */}
			<PageHeader title='Quản lý users' />
			{/* Search */}
			<Input
				type='text'
				placeholder='Search by name or email...'
				className='w-full mb-4'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Card>
				<CardContent>
					<Table className='w-full'>
						<TableHeader className='bg-gray-50 text-gray-600 text-sm'>
							<TableRow>
								<TableHead className='px-6 py-3 text-left'>Name</TableHead>
								<TableHead className='px-6 py-3 text-left'>Email</TableHead>
								<TableHead className='px-6 py-3 text-left'>Role</TableHead>
								<TableHead className='px-6 py-3 text-left'>Status</TableHead>
								<TableHead className='px-6 py-3 text-left'>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.map((user) => (
								<TableRow key={user.id} className='border-t text-sm hover:bg-gray-50'>
									<TableCell className='px-6 py-4'>{user.name}</TableCell>
									<TableCell className='px-6 py-4'>{user.email}</TableCell>
									<TableCell className='px-6 py-4'>{user.role}</TableCell>
									<TableCell className='px-6 py-4'>
										<Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
											{user.status}
										</Badge>
									</TableCell>
									<TableCell className='px-6 py-4 flex gap-2'>
										<Button variant='outline'>Edit</Button>
										<Button variant='destructive'>Delete</Button>
									</TableCell>
								</TableRow>
							))}

							{filteredUsers.length === 0 && (
								<TableRow>
									<TableCell col-span='5' className='text-center py-6 text-gray-500'>
										No users found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}
