export default function PageHeader({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="my-4">
			<h1 className='text-3xl font-bold text-primary'>{title}</h1>
			{description && <p className='mt-1'>{description}</p>}
		</div>
	);
}
