"use client";
import React, { useEffect, useState } from "react";
import { StudentData } from "@/interfaces/studentInterface";
import { getAllStudents, deleteStudent } from "@/services/studentService";
import { formatDate } from "../../../../utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

function StudentDetails() {
	const router = useRouter();
	//fail fast
	//proper pagination, cuz i can see pagination as part of the response
	const [studentData, setStudentData] = useState<StudentData[]>([]);
	useEffect(() => {
		handleAllStudents();
	}, []);
	const handleAllStudents = async () => {
		try {
			const res = await getAllStudents();
			res.data.length > 0 ? setStudentData(res.data) : setStudentData([]);
		} catch (err: any) {
			console.log(err);
			alert(err.message);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteStudent(id);
			alert(res.message);
			router.refresh();
		} catch (err: any) {
			console.log(err);
			alert(err.message);
		}
	};
	return (
		<section className="px-2">
			<p className="text-center underline text-orange-500 text-lg">
				All students
			</p>
			<div className="grid grid-cols-2 gap-4 ">
				{studentData.length > 0 ? (
					studentData.map((item: StudentData) => (
						<main
							key={item.id}
							className="flex flex-col gap-2 border border-orange-900 text-white"
						>
							<div className="flex items-center gap-4">
								<p className="underline">FIRST NAME:</p>
								<p>{item.firstName}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="underline">LAST NAME:</p>
								<p>{item.lastName}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="underline">EMAIL ADDRESS:</p>
								<p>{item.email}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="underline">DATE OF BIRTH:</p>
								<p>{formatDate(item.dob)}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="underline">GENDER:</p>
								<p>{item.sex}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="underline">ENROLLMENT DATE:</p>
								<p>{formatDate(item.createdAt)}</p>
							</div>
							<button className="bg-orange-900 text-white p-1 w-[10rem] rounded">
								<Link href={`/admin-dashboard/students/details/${item.id}`}>
									View More
								</Link>
							</button>
							<button
								onClick={() => handleDelete(item.id)}
								className="bg-orange-900 text-white p-1 w-[10rem] rounded"
							>
								Delete
							</button>
						</main>
					))
				) : (
					<p>loading...</p>
				)}
			</div>
		</section>
	);
}

export default StudentDetails;
