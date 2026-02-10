'use client';
import { useState } from 'react';

import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CopyButton({ character }: { character: string }) {
	const [copied, setCopied] = useState(false);
	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	return (
		<Button variant='secondary' onClick={() => handleCopy(character)}>
			{copied ? (
				<>
					<Check className='size-4' />
					<span>Đã sao chép</span>
				</>
			) : (
				<>
					<Copy className='size-4' />
					<span>Sao chép</span>
				</>
			)}
		</Button>
	);
}
