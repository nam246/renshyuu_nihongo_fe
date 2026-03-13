// import { Level } from '@/types/types';

export default async function LearningLayout({
	children,
	// params,
}: {
	children: React.ReactNode;
	// params: Promise<{ level: Level }>;
}) {
	return <div className='space-y-6'>{children}</div>;
}
