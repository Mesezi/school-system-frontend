"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { classData } from "@/modules/super-admin/Class/Class";
import { getClassInfo } from "@/services/classService";
import { addResult } from "@/services/resultService";
import { useAppSelector } from "@/lib/hook";
import { Result } from "@/interfaces/ResultInterface";

function page() {
	const schoolData = useAppSelector(
		(state: { information: any }) => state.information
	);
	const params = useParams<{ id: string }>();
	const searchParams = useSearchParams();
	const classId = searchParams.get("classId");
	useEffect(() => {
		handleClassInfo();
	}, []);
	const [classSubjects, setclassSubjects] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [comment, setComment] = useState<string>("");

	const handleClassInfo = async () => {
		setIsLoading(true);
		try {
			const res = await getClassInfo(classId || "");
			const subjects: {
				name: string;
				schemeOfWork: any;
				subjectDescription: string;
			}[] = res.data.classInformation.subjects;
			if (subjects.length > 0) {
				const filteredSubjects = subjects.map(
					({ name, ...data }, index: number) => {
						return {
							subject: name,
							test1: "",
							test2: "",
							exam: "",
							id: index + 1,
						};
					}
				);
				// console.log(filteredSubjects);
				setclassSubjects(filteredSubjects);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				setclassSubjects([]);
			}
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setclassSubjects([]);
			setIsLoading(false);
		}
	};

	const handleScoreChange = (id: any, field: any, value: any) => {
        let maxValue;
        switch (field) {
          case "test1":
            maxValue = schoolData?.information?.schoolResultDetails?.scores?.test1;
            break;
          case "test2":
            maxValue = schoolData?.information?.schoolResultDetails?.scores?.test2;
            break;
          case "exam":
            maxValue = schoolData?.information?.schoolResultDetails?.scores?.exam;
            break;
          default:
            maxValue = 100;
        }
      
        let numValue = Number(value);
      
        setclassSubjects(prevSubjects => {
          const updatedSubjects = prevSubjects.map(subject => {
            if (subject.id === id) {
              let updatedValue = numValue;
              let showAlert = false;
              let alertMessage = '';
      
              if (numValue > maxValue) {
                updatedValue = maxValue;
                showAlert = true;
                alertMessage = `${field} scores cannot exceed ${maxValue}`;
              }
      
              const updatedSubject = { ...subject, [field]: updatedValue };
              const total = calculateTotal(updatedSubject);
      
              if (total > 100) {
                const excess = total - 100;
                updatedValue = Math.max(0, updatedValue - excess);
                showAlert = true;
                alertMessage = 'Total score cannot exceed 100. Adjusting input.';
              }
      
              if (showAlert) {
                alert(alertMessage);
              }
      
              return { ...updatedSubject, [field]: updatedValue };
            }
            return subject;
          });
      
          return updatedSubjects;
        });
      };

    const calculateTotal = (subject:any) => {
        const scores = [subject.test1, subject.test2, subject.exam].map(Number);
        return scores.reduce((a, b) => a + b, 0);
      };

	// const handleAddSubject = () => {
	// 	const newId = Math.max(...subjects.map((s) => s.id)) + 1;
	// 	setSubjects([
	// 		...subjects,
	// 		{ id: newId, name: `Subject ${newId}`, test1: "", test2: "", exam: "" },
	// 	]);
	// };

	const handleDeleteSubject = (id: any) => {
		setclassSubjects(classSubjects.filter((subject) => subject.id !== id));
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		let { session, term } = schoolData?.information?.schoolSessionAndTerm;
		switch (term) {
			case "1":
				term = "1st";
				break;
			case "2":
				term = "2nd";
				break;
			case "3":
				term = "3rd";
				break;
			default:
				term = "";
		}
		//remove id when sending to backend
		const resultData = {
			session: session.replaceAll("/", "-"),
			term: "2nd",
			comments: comment,
			results: classSubjects.map(({ id, ...item }: any) => {
				return {
					...item,
					test1: Number(item.test1),
					test2: Number(item.test2),
					exam: Number(item.exam),
				};
			}),
		};
		console.log(resultData);
		// return;
		try {
			const res = await addResult(resultData, params.id);
			console.log(res);
            alert('result successfully sent for verification, please contact super admin for verification status')
			// alert(res.message);
			setIsSubmitting(false);
		} catch (err: any) {
			setIsSubmitting(false);
			console.log(err);
			const errorMessage = err?.message || "An error occurred";
			alert(err?.response?.data?.message);
		}
		console.log(classSubjects);
	};

	//JSX
	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="container mx-auto p-4">
			{classSubjects.length <= 0 ? (
				<p className="text-center">
					No registered subject for this class, please visit the class section
					to add your preferred subjects
				</p>
			) : (
				<>
                <p className='underline text-2xl'>Result Spreadsheet</p>
					<p className="text-red-500">
						Please not that your total cannot exceed 100
					</p>
					<table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-black">
						<thead className="!bg-white text-black">
							<tr className="!bg-white text-black">
								<th className="px-4 py-2 bg-white">Subject</th>
								<th className="px-4 py-2 bg-white">Test 1</th>
								<th className="px-4 py-2 bg-white">Test 2</th>
								<th className="px-4 py-2 bg-white">Exam</th>
								<th className="px-4 py-2 bg-white">Total</th>
								<th className="px-4 py-2 bg-white">Action</th>
							</tr>
						</thead>
						<tbody>
							{classSubjects.map((subject) => (
								<tr key={subject.id} className="border-b hover:bg-gray-100">
									<td className="px-4 py-2">{subject.subject}</td>
									<td className="px-4 py-2">
										<input
											type="number"
											value={subject.test1}
                                            placeholder={`max ${schoolData?.information?.schoolResultDetails?.scores?.test1}`}
                                            max={schoolData?.information?.schoolResultDetails?.scores?.test1}
											onChange={(e) =>
												handleScoreChange(subject.id, "test1", e.target.value)
											}
											className="w-full p-1 border rounded"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											type="number"
											value={subject.test2}
                                            placeholder={`max ${schoolData?.information?.schoolResultDetails?.scores?.test2}`}
                                            max={schoolData?.information?.schoolResultDetails?.scores?.test2}
											onChange={(e) =>
												handleScoreChange(subject.id, "test2", e.target.value)
											}
											className="w-full p-1 border rounded"
										/>
									</td>
									<td className="px-4 py-2">
										<input
											type="number"
											value={subject.exam}
                                            placeholder={`max ${schoolData?.information?.schoolResultDetails?.scores?.exam}`}
                                            max={schoolData?.information?.schoolResultDetails?.scores?.exam}
											onChange={(e) =>
												handleScoreChange(subject.id, "exam", e.target.value)
											}
											className="w-full p-1 border rounded"
										/>
									</td>
									<td className="px-4 py-2 font-bold">
										{calculateTotal(subject)}
									</td>
									<td className="px-4 py-2">
										<button
											onClick={() => handleDeleteSubject(subject.id)}
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}

			<div className="flex-col flex gap-2 mt-4">
				<label>Comment</label>
				<input
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					type="text"
					name="comment"
					className="p-3 rounded-lg bg-white text-black w-full lg:w-[50%]"
				/>
			</div>

			<button
				disabled={isSubmitting ? true : false}
				onClick={handleSubmit}
				// onClick={handleAddSubject}
				className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				{isSubmitting ? "submitting..." : "Submit Results for approval"}
			</button>
		</div>
	);
}

export default page;
