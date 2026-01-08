import Link from 'next/link';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DetailsNotFound({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Card className='max-w-md'>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>
					<Link href='/vocabularies'>
						<Button className='w-full'>
							<ArrowLeft className='w-4 h-4 mr-2' />
							Quay lại danh sách
						</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
