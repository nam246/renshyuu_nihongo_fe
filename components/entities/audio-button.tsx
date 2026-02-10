'use client';

import { AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AudioButton({ word }: { word: string }) {
	const handleSpeak = (text: string) => {
		if ('speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = 'ja-JP';
			speechSynthesis.speak(utterance);
		}
	};
	return (
		<Button variant='secondary' onClick={() => handleSpeak(word)}>
			<AudioLines />
		</Button>
	);
}
