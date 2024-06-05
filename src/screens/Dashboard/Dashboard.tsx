"use client";
import React, { useEffect } from "react";
import { AllinformationSchema } from "@/interfaces/information.interface";
import { useAppDispatch } from "@/lib/hook";
import { getSchoolInfo } from "@/services/informationService";
import { setSchoolInformation } from "@/lib/slices/SchoolInformationSlice";
function Dashboard() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		handleSchoolInfo();
	}, []);
	const handleSchoolInfo = async () => {
		try {
			const res = await getSchoolInfo();
			dispatch(setSchoolInformation(res.data));
			console.log(res.data);
		} catch (err: any) {
			console.log(err);
		} finally {
		}
	};
	return <div>This is the Landing page</div>;
}

export default Dashboard;
