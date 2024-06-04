"use client";
import React, { useState, useEffect } from "react";
import { getSchoolInfo, editSchoolInfo } from "@/services/informationService";
import { schoolInformationData } from "@/interfaces/information.interface";
import { formatDateAndTime, formatDate } from "../../../utils";
import { RiLoader4Fill } from "react-icons/ri";

function Information() {
	const [isloading, setIsloading] = useState<boolean>(false);
	const [schoolData, setSchoolData] = useState<schoolInformationData>({
		schoolAddress: "",
		schoolColor: "",
		schoolEmail: "",
		schoolGradingSystem: { exam: 0, test1: 0, test2: 0 },
		schoolLogo: "",
		schoolShortName: "",
	});
	// const [formData, setFormData] = useState({});
	useEffect(() => {
		handleSchoolInfo();
	}, []);
	const handleSchoolInfo = async () => {
		try {
			const res = await getSchoolInfo();
			// console.log(res.data);
			setSchoolData(res.data.schoolInformation);
		} catch (err: any) {
			console.log(err);
		} finally {
		}
	};

	const handleEdit = async (e: any) => {
		e.preventDefault();
		setIsloading(true);
		try {
			const res = await editSchoolInfo(schoolData);
			console.log(res);
			setIsloading(false);
			alert(res.message);
			handleSchoolInfo();
		} catch (err: any) {
			setIsloading(false);
			console.log(err);
		} finally {
			setIsloading(false);
		}
	};

	return (
		<form onSubmit={handleEdit} className="p-2 flex flex-col gap-4">
			{/* <div className=" text-white flex gap-1">
				<p className="underline">School Name:</p>
				<p>{schoolData?.schoolName}</p>
			</div>
			<div className=" text-white flex gap-1">
				<p className="underline">Account Created:</p>
				<p>{formatDateAndTime(schoolData?.createdAt || "")}</p>
			</div>
			<div className=" text-white flex gap-1">
				<p className="underline">Current Session:</p>
				<p>{schoolData?.schoolSessionAndTerm?.session}</p>
			</div>
			<div className=" text-white flex gap-1">
				<p className="underline">Current Term:</p>
				<p>{schoolData?.schoolSessionAndTerm?.term}st Term</p>
			</div>
			<div className="text-white flex gap-1">
				<p className="">Current term is expected to end on </p>
				<p className="underline">
					{formatDate(schoolData?.schoolSessionAndTerm?.termEndDate || "")}
				</p>
			</div> */}

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School Address</label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolAddress"
					value={schoolData?.schoolAddress}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School short name</label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolShortName"
					value={schoolData?.schoolShortName}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School official email</label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolEmail"
					value={schoolData?.schoolEmail}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School official color</label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="color"
					name="schoolColor"
					value={schoolData?.schoolColor}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<button
				type="submit"
				className="p-2 border border-red-600 text-black bg-white rounded-lg w-1/2 flex items-center justify-center"
			>
				{isloading ? (
					<RiLoader4Fill className="h-[2rem] w-[2rem] text-green animate-spin text-black" />
				) : (
					"Update"
				)}
			</button>
		</form>
	);
}

export default Information;
