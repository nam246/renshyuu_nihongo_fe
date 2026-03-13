'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AddNotesButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Thêm Ghi Chú</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[800]'>
				<DialogHeader>
					<DialogTitle>Ghi chú</DialogTitle>
					<DialogDescription>
						Thêm các ghi chú cho ngữ pháp để dễ dàng ghi nhớ.
					</DialogDescription>
				</DialogHeader>

				<form action='' className='grid grid-cols-1 gap-4'>
					<div className='w-full space-y-2'>
						<Label htmlFor='title'>Tiêu đề</Label>
						<Input id='title' name='title' placeholder='' />
					</div>
					<div className='w-full space-y-2'>
						<Label htmlFor='description'>Ghi Chú</Label>
						<Textarea />
					</div>
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Đóng</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
