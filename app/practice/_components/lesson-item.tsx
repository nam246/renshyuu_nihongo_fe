'use client';

import { useState } from 'react';
import { Lesson } from '@/types';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonItem({ lesson }: { lesson: Lesson }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className='flex w-[350px] flex-col gap-2'
		>
			<div className='flex items-center justify-between gap-4 px-4'>
				<h4 className='text-sm font-semibold'>Lesson {lesson.lessonNumber}</h4>
				<CollapsibleTrigger asChild>
					<Button variant='ghost' size='icon' className='size-8'>
						<ChevronsUpDown />
						<span className='sr-only'>Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent className='flex flex-col gap-2'>
				{lesson.grammar.map((g, i) => (
					<div key={i} className='rounded-md border px-4 py-2 font-mono text-sm'>
						{g.structure}
						<FontAwesomeIcon icon={faAnglesRight} className='float-end' />
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
