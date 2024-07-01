import React from "react";
import * as yup from "yup";
import { Form, Formik, Field, FieldArray, ErrorMessage } from "formik";
import { classSubjectData } from "@/interfaces/classInterface";
import { v4 as uuidv4 } from "uuid";

function AddSubjectForm({subjectData}:{subjectData:classSubjectData[]}) {
	return (
		<div>
			{" "}
			<FieldArray name="subjects">
				{({ insert, remove, push }) => (
					<div className="">
						<h3 className="text-lg text-orange-500 underline">Subjects</h3>
						{subjectData.length > 0 &&
							subjectData.map((subject: any, index: any) => (
								<div
									key={index}
									className="flex gap-4 flex-col border-blue-500 border p-4 my-2"
								>
									<div className="flex flex-col">
										<label htmlFor={`subjects.${index}.name`}>
											Subject Name
										</label>
										<Field
											className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
placeholder:text-[#A1A7AD] outline-none bg-white text-black"
											name={`subjects.${index}.name`}
										/>
										<ErrorMessage
											className="text-red-500"
											name={`subjects.${index}.name`}
											component="div"
										/>
									</div>

									<div className="flex flex-col">
										<label htmlFor={`subjects.${index}.subjectDescription`}>
											Subject Description
										</label>
										<Field
											className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
placeholder:text-[#A1A7AD] outline-none bg-white text-black"
											name={`subjects.${index}.subjectDescription`}
										/>
										<ErrorMessage
											className="text-red-500"
											name={`subjects.${index}.subjectDescription`}
											component="div"
										/>
									</div>

									<FieldArray name={`subjects.${index}.schemeOfWork`}>
										{({
											insert: insertWeek,
											remove: removeWeek,
											push: pushWeek,
										}) => (
											<div className="">
												<h4 className="underline text-orange-500">
													Scheme of Work
												</h4>
												{subject.schemeOfWork.length > 0 &&
													subject.schemeOfWork.map(
														(week: any, weekIndex: any) => (
															<div
																key={weekIndex}
																className="flex flex-col gap-4 border-orange-500 border p-2 m-2"
															>
																<div className="flex flex-col">
																	<label
																		htmlFor={`subjects.${index}.schemeOfWork.${weekIndex}.week`}
																	>
																		Week No
																	</label>
																	<Field
																		className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
                                                        placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																		name={`subjects.${index}.schemeOfWork.${weekIndex}.week`}
																		type="number"
																	/>
																	<ErrorMessage
																		name={`subjects.${index}.schemeOfWork.${weekIndex}.week`}
																		component="div"
																		className="text-red-500"
																	/>
																</div>

																<div className="flex flex-col">
																	<label
																		htmlFor={`subjects.${index}.schemeOfWork.${weekIndex}.topic`}
																	>
																		Topic Title
																	</label>
																	<Field
																		className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
                                                        placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																		name={`subjects.${index}.schemeOfWork.${weekIndex}.topic`}
																	/>
																	<ErrorMessage
																		name={`subjects.${index}.schemeOfWork.${weekIndex}.topic`}
																		component="div"
																		className="text-red-500"
																	/>
																</div>

																<div className="flex flex-col">
																	<label
																		htmlFor={`subjects.${index}.schemeOfWork.${weekIndex}.description`}
																	>
																		Topic Description
																	</label>
																	<Field
																		className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
                                                        placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																		name={`subjects.${index}.schemeOfWork.${weekIndex}.description`}
																	/>
																	<ErrorMessage
																		name={`subjects.${index}.schemeOfWork.${weekIndex}.description`}
																		component="div"
																		className="text-red-500"
																	/>
																</div>

																<button
																	className="bg-red-500 p-1 rounded"
																	type="button"
																	onClick={() => removeWeek(weekIndex)}
																>
																	Remove Week
																</button>
															</div>
														)
													)}
												<button
													className=" bg-orange-500 p-1 mt-2 rounded w-full"
													type="button"
													onClick={() =>
														pushWeek({
															week: "",
															topic: "",
															description: "",
														})
													}
												>
													Add Week
												</button>
											</div>
										)}
									</FieldArray>

									<button
										className="bg-red-500 p-1 mt-2 rounde"
										type="button"
										onClick={() => remove(index)}
									>
										Remove Subject
									</button>
								</div>
							))}
						<button
							className="p-1 bg-blue-500 rounded mt-2 w-full"
							type="button"
							onClick={() =>
								push({
									id: uuidv4(),
									name: "",
									subjectDescription: "",
									schemeOfWork: [{ week: "", topic: "", description: "" }],
								})
							}
						>
							Add Subject
						</button>
					</div>
				)}
			</FieldArray>
		</div>
	);
}

export default AddSubjectForm;
