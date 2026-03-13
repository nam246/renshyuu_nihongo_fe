'use client';

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog';
import {
	Sidebar,
	SidebarContent,
	SidebarProvider,
	SidebarInset,
} from '@/components/ui/sidebar';

import { Button } from '@/components/ui/button';

import { TestInfomation } from './test-infomation';

export default function TestDetailLayout({
	sidebar,
	mainContent,
	testStarted,
	onStartTest,
	totalQuestions,
}: {
	sidebar: React.ReactNode;
	mainContent: React.ReactNode;
	testStarted: boolean;
	onStartTest: () => void;
	totalQuestions: number;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Chi tiết</Button>
			</DialogTrigger>
			<DialogContent className='min-w-full min-h-screen p-0 border-none rounded-none overflow-hidden'>
				<DialogHeader className='sr-only'>
					<DialogTitle>Quick Test</DialogTitle>
					<DialogDescription>JLPT Quick Test</DialogDescription>
				</DialogHeader>

				{!testStarted ? (
					<div className='min-w-2xl mx-auto'>
						<TestInfomation
							totalQuestions={totalQuestions}
							handleStartTest={onStartTest}
						/>
					</div>
				) : (
					<SidebarProvider
						style={
							{
								'--sidebar-width': '280px',
							} as React.CSSProperties
						}
					>
						{/* Sidebar */}
						<Sidebar collapsible='none' className='border-r'>
							<SidebarContent className='overflow-hidden'>{sidebar}</SidebarContent>
						</Sidebar>

						{/* Main Content */}
						<SidebarInset className='h-screen flex flex-col overflow-hidden'>
							{mainContent}
						</SidebarInset>
					</SidebarProvider>
				)}

				<DialogFooter>
					<DialogClose asChild>
						{/* <Button variant='outline'>Cancel</Button> */}
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
