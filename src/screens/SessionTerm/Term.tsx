"use client";
import React, { useState, useEffect } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { sessionSchema } from "@/interfaces/information.interface";
import { editTermDate, getSchoolInfo } from "@/services/informationService";
import { setSchoolInformation } from "@/lib/slices/SchoolInformationSlice";
import { formatDateTimeForInput } from "../../../utils";
function Term() {
	const dispatch = useAppDispatch();
	const data = useAppSelector(
		(state: { information: any }) => state.information
	);
	const [isloading, setIsloading] = useState<boolean>(false);
	const [currentSession, setCurrentSession] = useState<sessionSchema>(
		data?.information?.schoolSessionAndTerm || {}
	);
	const handleSchoolInfo = async () => {
		try {
			const res = await getSchoolInfo();
			dispatch(setSchoolInformation(res.data));
		} catch (err: any) {
			console.log(err);
		} finally {
		}
	};

	const handleEdit = async (e: any) => {
		e.preventDefault();
		setIsloading(true);
		console.log(currentSession);
		const { _id, ...sessionWithoutId } = currentSession;
		try {
			const res = await editTermDate({
				...sessionWithoutId,
				termEndDate: new Date(sessionWithoutId.termEndDate).toISOString(),
			});
			console.log(res);
			setIsloading(false);
			alert(res.message);
			handleSchoolInfo();
		} catch (err: any) {
			setIsloading(false);
			console.log(err);
			handleSchoolInfo();
		} finally {
			setIsloading(false);
		}
	};

	return (
		<form onSubmit={handleEdit} className="p-2 flex flex-col gap-4">
			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>Current Session</label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="session"
					disabled={true}
					value={currentSession?.session}
					onChange={(e) =>
						setCurrentSession({
							...currentSession,
							[e.target.name]: e.target.value,
						})
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>Current Term</label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="text"
					name="term"
					disabled={true}
					value={currentSession?.term}
					onChange={(e) =>
						setCurrentSession({
							...currentSession,
							[e.target.name]: e.target.value,
						})
					}
				/>
			</div>

			<div className="input_Wrapper text-white flex flex-col gap-1">
				<label>Current Term ends on </label>
				<input
					className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
					type="datetime-local"
					name="termEndDate"
					value={formatDateTimeForInput(currentSession?.termEndDate)}
					onChange={(e) =>
						setCurrentSession({
							...currentSession,
							[e.target.name]: e.target.value,
						})
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

export default Term;
