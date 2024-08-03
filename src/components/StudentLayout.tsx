"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function StudentLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const logout = () => {
		router.replace("/student-login");
		if (typeof window !== "undefined") {
			sessionStorage.clear();
		}
	};
	return (
		<section className="flex">
			<aside className="w-[16rem] h-screen fixed border border-blue-500">
				<div className="flex flex-col text-white gap-4 p-4">
					<Link href="/student-dashboard">
						<p>Home</p>
					</Link>
					<Link href="/student-dashboard/settings">
						<p>Settings</p>
					</Link>
					<p className="cursor-pointer" onClick={logout}>
						Logout
					</p>
				</div>
			</aside>
			<main className="ml-[16rem] w-[calc(100%-16rem)]">{children}</main>
		</section>
	);
}

export default StudentLayout;
