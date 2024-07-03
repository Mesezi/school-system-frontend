"use client";
import React, { useState, useEffect } from "react";
import { getSchoolInfo, editSubjects } from "@/services/informationService";
import { RiLoader4Fill } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setSchoolInformation } from "@/lib/slices/SchoolInformationSlice";
import { SchoolSubjectsSchema } from "@/interfaces/information.interface";
import { useRouter } from "next/navigation";

function Subjects() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const data = useAppSelector(
		(state: { information: any }) => state.information
	);
	const [isloading, setIsloading] = useState<boolean>(false);
	const [schoolSubjects, setSchoolSubjects] = useState<SchoolSubjectsSchema>(
		data?.information?.schoolSubjects || {}
	);
	const [newSubject, setNewSubject] = useState("");
	const [category, setCategory] = useState("primary");

	const handleSchoolInfo = async () => {
		try {
			const res = await getSchoolInfo();
			dispatch(setSchoolInformation(res.data));
			router.refresh();
		} catch (err: any) {
			console.log(err);
		} finally {
		}
	};

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSchoolSubjects((prevSubjects) => ({
				...prevSubjects,
				[category]: [
					...prevSubjects[category as keyof SchoolSubjectsSchema],
					newSubject,
				],
			}));
		}
		setNewSubject("");
	};

	const handleEditSubject = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		category: string
	) => {
		const updatedSubjects = [
			...schoolSubjects[category as keyof SchoolSubjectsSchema],
		];
		updatedSubjects[index] = e.target.value;
		setSchoolSubjects({
			...schoolSubjects,
			[category]: updatedSubjects,
		});
	};

	const saveSubjects = async (data: SchoolSubjectsSchema) => {
		setIsloading(true);
		try {
			const { _id, ...subjectsWithoutId } = data;
			const res = await editSubjects(subjectsWithoutId);
			// call global state
			handleSchoolInfo();
			setIsloading(false);
			alert(res.message);
		} catch (err: any) {
			setIsloading(false);
			console.log(err);
			alert(err.message);
		} finally {
			setIsloading(false);
		}
	};

	return (
		<form
			className="p-2 flex flex-col gap-4"
			onSubmit={(e) => e.preventDefault()}
		>
			<p className="underline text-2xl">Primary</p>
			{schoolSubjects.primary?.length > 0 ? (
				schoolSubjects.primary.map((item, index) => (
					<input
						key={index}
						type="text"
						value={item}
						onChange={(e) => handleEditSubject(e, index, "primary")}
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md outline-none bg-white text-black"
					/>
				))
			) : (
				<p>No registered subject for Primary School</p>
			)}
			<p className="underline text-2xl">Junior Secondary</p>
			{schoolSubjects.juniorSecondary?.length > 0 ? (
				schoolSubjects.juniorSecondary.map((item, index) => (
					<input
						key={index}
						type="text"
						value={item}
						onChange={(e) => handleEditSubject(e, index, "juniorSecondary")}
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md outline-none bg-white text-black"
					/>
				))
			) : (
				<p>No registered subject for Junior Secondary School</p>
			)}
			<p className="underline text-2xl">Senior Secondary</p>
			{schoolSubjects.seniorSecondary?.length > 0 ? (
				schoolSubjects.seniorSecondary.map((item, index) => (
					<input
						key={index}
						type="text"
						value={item}
						onChange={(e) => handleEditSubject(e, index, "seniorSecondary")}
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md outline-none bg-white text-black"
					/>
				))
			) : (
				<p>No registered subject for Senior Secondary School</p>
			)}
			<div className="flex flex-col gap-4 text-black">
				<h2>Add New Subject</h2>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md outline-none bg-white text-black"
					type="text"
					value={newSubject}
					onChange={(e) => setNewSubject(e.target.value)}
					placeholder="Enter new subject"
					required={true}
				/>
				<select
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md outline-none bg-white text-black"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required={true}
				>
					<option value="primary">Primary</option>
					<option value="juniorSecondary">Junior Secondary</option>
					<option value="seniorSecondary">Senior Secondary</option>
				</select>
				<button
					type="button"
					className="p-2 border border-red-600 text-black bg-white rounded-lg w-1/2 flex items-center justify-center"
					onClick={handleAddSubject}
				>
					{isloading ? (
						<RiLoader4Fill className="h-[2rem] w-[2rem] text-green animate-spin text-black" />
					) : (
						"Add Subject"
					)}
				</button>
			</div>
			<div className="flex flex-col gap-4 text-black">
				<h2>Save Changes</h2>
				<button
					type="button"
					className="p-2 border border-red-600 text-black bg-white rounded-lg w-1/2 flex items-center justify-center"
					onClick={() => saveSubjects(schoolSubjects)}
				>
					{isloading ? (
						<RiLoader4Fill className="h-[2rem] w-[2rem] text-green animate-spin text-black" />
					) : (
						"Save Changes"
					)}
				</button>
			</div>
		</form>
	);
}

export default Subjects;
