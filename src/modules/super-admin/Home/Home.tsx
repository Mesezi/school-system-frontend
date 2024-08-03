"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { getSchoolInfo } from "@/services/informationService";
import { setSchoolInformation } from "@/lib/slices/SchoolInformationSlice";
function Home() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		handleSchoolInfo();
	}, []);
	const handleSchoolInfo = async () => {
		try {
			const res = await getSchoolInfo();
			dispatch(setSchoolInformation(res.data));
			// console.log(res.data);
		} catch (err: any) {
			console.log(err);
		} finally {
		}
	};
	return <div>This is the Landing for Super Admin and Admin page</div>;
}

export default Home;
