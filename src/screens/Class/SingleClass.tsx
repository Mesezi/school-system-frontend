"use client";
import React from "react";
import Link from "next/link";

function SingleClass() {
	return (
		<section className="px-4">
			<button className="border border-orange-500 p-2 rounded-sm w-40  bg-orange-500">
				<Link href={"/dashboard/class"}>Go back</Link>
			</button>
		</section>
	);
}

export default SingleClass;
