import React from "react";
import Sidebar from "./Sidebar";

function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className='flex'>
			<aside className='w-[16rem] h-screen fixed border border-blue-500'>
				<Sidebar />
			</aside>
			<main className='ml-[16rem] w-[calc(100%-16rem)]'>{children}</main>
		</section>
	);
}

export default DashboardLayout;
