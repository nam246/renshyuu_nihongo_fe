import PageBreadcrumb from '@/components/layout/breadcrumb';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<div className="max-w-7xl min-h-screen mx-auto">
				<PageBreadcrumb />
				{children}
			</div>
			<Footer />
		</>
	);
}
