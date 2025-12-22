import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8'>
			<div className='max-w-7xl mx-auto space-y-8'>
				{/* Header Skeleton */}
				<div className='space-y-4'>
					<Skeleton className='h-12 w-64' />
					<Skeleton className='h-6 w-96' />
				</div>

				{/* Stats Cards */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{[1, 2, 3, 4].map((item) => (
						<Card key={item} className='overflow-hidden'>
							<CardContent className='p-6 space-y-3'>
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-8 w-32' />
								<Skeleton className='h-3 w-40' />
							</CardContent>
						</Card>
					))}
				</div>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Large Card - Left Side */}
					<div className='lg:col-span-2'>
						<Card>
							<CardHeader>
								<div className='space-y-3'>
									<Skeleton className='h-6 w-48' />
									<Skeleton className='h-4 w-72' />
								</div>
							</CardHeader>
							<CardContent className='space-y-4'>
								{/* Chart/Graph Skeleton */}
								<Skeleton className='h-64 w-full rounded-lg' />

								{/* Legend */}
								<div className='flex gap-4'>
									{[1, 2, 3].map((item) => (
										<div key={item} className='flex items-center gap-2'>
											<Skeleton className='h-3 w-3 rounded-full' />
											<Skeleton className='h-3 w-16' />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar - Right Side */}
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<Skeleton className='h-6 w-32' />
							</CardHeader>
							<CardContent className='space-y-4'>
								{[1, 2, 3, 4].map((item) => (
									<div key={item} className='flex items-center gap-3'>
										<Skeleton className='h-12 w-12 rounded-full' />
										<div className='flex-1 space-y-2'>
											<Skeleton className='h-4 w-full' />
											<Skeleton className='h-3 w-3/4' />
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Skeleton className='h-6 w-40' />
							</CardHeader>
							<CardContent className='space-y-3'>
								{[1, 2, 3].map((item) => (
									<div key={item} className='space-y-2'>
										<Skeleton className='h-4 w-full' />
										<Skeleton className='h-2 w-full rounded-full' />
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Table/List Skeleton */}
				<Card>
					<CardHeader>
						<div className='flex items-center justify-between'>
							<Skeleton className='h-6 w-48' />
							<Skeleton className='h-10 w-32' />
						</div>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{/* Table Header */}
							<div className='grid grid-cols-5 gap-4 pb-3 border-b'>
								{[1, 2, 3, 4, 5].map((item) => (
									<Skeleton key={item} className='h-4 w-20' />
								))}
							</div>

							{/* Table Rows */}
							{[1, 2, 3, 4, 5, 6].map((row) => (
								<div key={row} className='grid grid-cols-5 gap-4 items-center py-3'>
									<div className='flex items-center gap-3'>
										<Skeleton className='h-10 w-10 rounded' />
										<Skeleton className='h-4 w-24' />
									</div>
									<Skeleton className='h-4 w-32' />
									<Skeleton className='h-4 w-20' />
									<Skeleton className='h-6 w-16 rounded-full' />
									<Skeleton className='h-8 w-8 rounded' />
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Bottom Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{[1, 2, 3].map((item) => (
						<Card key={item}>
							<CardContent className='p-6 space-y-4'>
								<Skeleton className='h-40 w-full rounded-lg' />
								<Skeleton className='h-5 w-full' />
								<Skeleton className='h-4 w-3/4' />
								<div className='flex gap-2 pt-2'>
									<Skeleton className='h-9 flex-1' />
									<Skeleton className='h-9 w-20' />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
