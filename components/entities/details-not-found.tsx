import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import BackButton from '@/components/layout/BackButton';

export default function DetailsNotFound({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<Card className='max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<BackButton />
			</CardFooter>
		</Card>
	);
}
