
import Link from "next/link";

export default function Home() {
	return (
		<section>
			<main className="flex flex-col lg:flex-row	 min-h-screen  items-center justify-between p-24">
				<Link href={"/admin-login"}>
					<div className="border border-red-600 cursor-pointer flex justify-center items-center h-20 rounded p-4">
						Admin Login
					</div>
				</Link>
				<Link href={"/login"}>
					<div className="border border-orange-500 flex justify-center items-center cursor-pointer h-20 rounded p-4">
						Super Admin Login
					</div>
				</Link>
				<Link href={"/student-login"}>
					<div className="border flex justify-center items-center border-blue-500 cursor-pointer h-20 rounded p-4">
						Student Login
					</div>
				</Link>
			</main>
		</section>
	);
}
