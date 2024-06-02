"use client";
import React, { useState, useEffect } from "react";
import { getSchoolInfo } from "@/services/informationService";
import {
	informationSchema,
} from "@/interfaces/information.interface";
import { formatDateAndTime, formatDate } from "../../../utils";

function Information() {
	const [schoolData, setSchoolData] = useState<informationSchema>({
		createdAt: "",
		id: "",
		_id: "",
		schoolAnnouncements: [],
		schoolInformation:'',
		schoolCalendar: [],
		schoolName: "",
		schoolSessionAndTerm: {
			session: "",
			term: "",
			termEndDate: "",
			_id: "",
		},
		schoolSubjects: {},
		updatedAt: "",
	});
	// const [formData, setFormData] = useState({});
	useEffect(() => {
		handleSchoolInfo();
	}, []);
	const handleSchoolInfo = async () => {
		try {
			const res = await getSchoolInfo();
			console.log(res.data);
			setSchoolData(res.data);
		} catch (err: any) {
			console.log(err);
		}
	};

	const handleInfoEdit = () => {};

	return (
		<form className="p-2 flex flex-col gap-4">
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
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School Name</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolName"
					value={schoolData?.schoolName}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School Address</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolAddress"
					value={schoolData?.schoolInformation?.schoolAddress}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School short name</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolShortName"
					value={schoolData?.schoolInformation?.schoolShortName}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School official email</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="schoolShortName"
					value={schoolData?.schoolInformation?.schoolEmail}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>School official color</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="color"
					name="schoolColor"
					value={schoolData?.schoolInformation?.schoolColor}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label className="underline">Grading System</label>
				<label>Exam</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="exam"
					value={schoolData?.schoolInformation?.schoolGradingSystem?.exam}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
				<label>Test 1</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="exam"
					value={schoolData?.schoolInformation?.schoolGradingSystem?.test1}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
				<label>Test 2</label>
				<input
					className="w-1/3 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="exam"
					value={schoolData?.schoolInformation?.schoolGradingSystem?.test2}
					onChange={(e) =>
						setSchoolData({ ...schoolData, [e.target.name]: e.target.value })
					}
				/>
			</div>
		</form>
	);
}

export default Information;
