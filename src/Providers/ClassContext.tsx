"use client";
import React,{ createContext, useEffect, useState } from "react";
import { getAllClasses } from "@/services/classService";

export const ClassContext = createContext<{ id: string; name: string }[]>([]);

export const ClassProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [classes, setAllClasses] = useState<{ id: string; name: string }[]>([]);
	useEffect(() => {
		handleAllClasses();
	}, []);
	const handleAllClasses = async () => {
		try {
			const res = await getAllClasses();
			if (res.data.length > 0) {
				const classDetails = res.data.map((item: any) => ({
					id: item.id,
					name: item.name,
				}));
				// console.log(classDetails);
				setAllClasses(classDetails);
			} else {
				setAllClasses([]);
			}
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setAllClasses([]);
			console.log(err);
		} finally {
		}
	};

	return (
		<ClassContext.Provider value={classes}>{children}</ClassContext.Provider>
	);
};


