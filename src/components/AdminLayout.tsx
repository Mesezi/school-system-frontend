"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const logout = () => {
		router.replace("/login");
		if (typeof window !== "undefined") {
			sessionStorage.clear();
		}
	};
	return (
		<section className="flex">
			<aside className="w-[16rem] h-screen fixed border border-blue-500">
				<div className="flex flex-col text-white gap-4 p-4">
					<Link href="/admin-dashboard">
						<p>Home</p>
					</Link>
					<Link href="/admin-dashboard/annoucements">
						<p>Annoucements</p>
					</Link>
					<Link href="/admin-dashboard/class">
						<p>Classes</p>
					</Link>
					<Link href="/admin-dashboard/information">
						<p>School info</p>
					</Link>
					<Link href="/admin-dashboard/subjects">
						<p>School Subjects</p>
					</Link>
					<Link href="/admin-dashboard/term-session">
						<p>School Session/Term</p>
					</Link>
					<Link href="/admin-dashboard/students">
						<p> Add Students</p>
					</Link>
					<Link href="/admin-dashboard/students/details">
						<p>Student details</p>
					</Link>
					<Link href="/admin-dashboard/create-admin">
						<p>Create Admin</p>
					</Link>
					<Link href="/admin-dashboard/result">
						<p>Results Processing</p>
					</Link>

					<p className="cursor-pointer" onClick={logout}>Logout</p>
				</div>
			</aside>
			<main className="ml-[16rem] w-[calc(100%-16rem)]">{children}</main>
		</section>
	);
}

export default AdminLayout;
