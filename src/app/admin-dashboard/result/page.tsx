"use client";
import { getAllClasses } from "@/services/classService";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAllStudents } from "@/services/studentService";

function page() {
	useEffect(() => {
		handleAllClasses();
	}, []);

	const [allClasses, setAllClasses] = useState<any[]>([]);
	const [studentList, setStudentList] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingStudent, setLoadingStudent] = useState(false);
	const [loadingClassId, setLoadingClassId] = useState<string | null>(null);
	const handleAllClasses = async () => {
		setLoading(true);
		try {
			const res = await getAllClasses();
			setAllClasses(res.data);
			console.log(res.data);
			setLoading(false);
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setAllClasses([]);
			console.log(err);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	const handleAllStudents = async (params: any) => {
		let studentData: any[] = [];
		try {
			const res = await getAllStudents(params);
			if (res.data.length > 0) {
				studentData = res.data.map((item: any) => ({
					name: `${item.firstName} ${item.lastName}`,
					id: item.id,
				}));
				console.log(studentData);
			} else {
				alert(
					"There are no students registered in this class, please visit the students section to add students"
				);
				studentData = [];
			}

			console.log(res.data);
			return studentData;
		} catch (err: any) {
			console.log(err);
			alert(err.message);
			return [];
		}
	};

	//work on the color and allignment
	const generateExcelTemplate = async (classId: string, subjectss: any[]) => {
		setLoadingClassId(classId);
		const subjects = subjectss.map((item: any) => ({
			name: item.name,
		}));

		const studentData = await handleAllStudents({ classId: classId });
		if (studentData.length <= 0 || subjects.length <= 0) {
			setLoadingClassId(null);
			return;
		}

		const wb = XLSX.utils.book_new(); // Create a new workbook
		const wsData = [];

		// Create first row with subject headers (merged)
		const headersRow1 = ["Name", "Student ID"];
		subjects.forEach((subject: any) => {
			headersRow1.push(subject.name, "", "");
		});
		wsData.push(headersRow1);

		// Create second row with sub-headers (Test1, Test2, Exam)
		const headersRow2 = ["", ""];
		subjects.forEach(() => {
			headersRow2.push("Test1", "Test2", "Exam");
		});
		wsData.push(headersRow2);

		// Add rows for each student with empty cells for the test and exam scores
		studentData.forEach((student) => {
			const row = [student.name, student.id];
			subjects.forEach(() => {
				// Empty cells for Test1, Test2, and Exam for each subject
				row.push("", "", "");
			});
			wsData.push(row);
		});

		// Create the worksheet
		const ws = XLSX.utils.aoa_to_sheet(wsData);

		// Merge cells for the subject headers in the first row
		let mergeRanges: any[] = [];
		subjects.forEach((_, index) => {
			const startCol = 2 + index * 3; // Starting column for each subject
			mergeRanges.push({
				s: { r: 0, c: startCol }, // Start of merge (row 0, col startCol)
				e: { r: 0, c: startCol + 2 }, // End of merge (row 0, col startCol + 2)
			});
		});

		ws["!merges"] = mergeRanges; // Add merges to worksheet

		// Style: Apply alignment, font, and fill (color) to headers
		const headerStyle = {
			alignment: { vertical: "center", horizontal: "center" }, // Center align
			font: { bold: true, color: { rgb: "FFFFFF" } }, // White text color
			fill: { fgColor: { rgb: "4F81BD" } }, // Blue background color
		};

		// Apply styles to first header row (subjects)
		headersRow1.forEach((_, index) => {
			const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
			if (!ws[cellAddress]) ws[cellAddress] = {};
			ws[cellAddress].s = headerStyle; // Apply the style
		});

		// Apply styles to second header row (sub-headers: Test1, Test2, Exam)
		headersRow2.forEach((_, index) => {
			const cellAddress = XLSX.utils.encode_cell({ r: 1, c: index });
			if (!ws[cellAddress]) ws[cellAddress] = {};
			ws[cellAddress].s = headerStyle; // Apply the style
		});

		// Set the worksheet column widths (optional, for better formatting)
		ws["!cols"] = [
			{ wch: 15 }, // Width for Name column
			{ wch: 10 }, // Width for Student ID column
			...subjects.flatMap(() => [{ wch: 10 }, { wch: 10 }, { wch: 10 }]), // Width for Test1, Test2, Exam columns
		];

		// Append the worksheet to the workbook
		XLSX.utils.book_append_sheet(wb, ws, "Template");

		// Generate Excel file
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

		// Trigger download
		const data = new Blob([excelBuffer], { type: "application/octet-stream" });
		saveAs(data, "StudentTemplate.xlsx");
		setLoadingClassId(null);
	};

	if (loading) return <p>loading...</p>;

	return (
		<div className="p-2">
			<p>Bulk upload? Generate sheet for your preferred class</p>
			<div className="flex flex-col gap-4 space-y-2 mt-4">
				{allClasses.length > 0 ? (
					allClasses.map((item: any) => (
						<button
							key={item.id}
							onClick={() => generateExcelTemplate(item.id, item.subjects)}
							className="p-2.5 bg-black text-white
            border  w-full md:w-[50%]"
						>
							{item.id === loadingClassId
								? "fetching Data..."
								: `Generate ${item.name} result sheet`}
						</button>
					))
				) : (
					<p>
						No class available, please go to the class section to add new
						classes
					</p>
				)}
			</div>
		</div>
	);
}

export default page;
