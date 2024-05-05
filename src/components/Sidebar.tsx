import React from "react";
import Link from "next/link";
function Sidebar() {
	return (
		<div className="flex flex-col text-white gap-4 p-4">
			<Link href="/dashboard">
				<p>Dashboard</p>
			</Link>
			<Link href="/dashboard/annoucements">
				<p>Annoucements</p>
			</Link>
			<Link href="/dashboard/class">
				<p>Classes</p>
			</Link>
		</div>
	);
}

export default Sidebar;
