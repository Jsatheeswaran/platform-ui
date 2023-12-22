import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { dateColumn, showUI, showUIList } from "./Components/utils";
import { DeleteApiByPk } from "./api";
function App() {
	const [reload, setReload] = useState(0);
	return (
		<div key={`management_task_${reload}`} className="flex flex-col">
			<div className="flex justify-between bg-blue-100 p-3">
				<div className="text-xl font-semibold text-gray-600">Task Management</div>
				<div>
					{showUI("modal", {
						title: "Create Task",
						components: [
							{
								component: "form",
								module: "management",
								entity: "tasks",
								formSchema: {
									taskName: {
										label: "Task Name",
										ui: "input",
										type: "string",
										constraints: {
											required: true,
										},
									},
									taskDescription: {
										label: "Task Description",
										ui: "textArea",
										type: "string",
										constraints: {
											maxLength: 60,
										},
									},
									status: {
										ui: "input",
										type: "string",
										label: "Task status",
									},
								},
							},
						],
						buttonLabel: "Add Task",
						triggerParentReload: () => setReload(reload + 1),
					})}
				</div>
			</div>
			<div className="flex flex-col py-3 px-2">
				{showUIList({
					components: [
						{
							component: "table",
							module: "management",
							entity: "tasks",
							columns: [
								{ header: "Task Name", accessor: "taskName" },
								{ header: "Description", accessor: "taskDescription" },
								{ header: "Status", accessor: "status" },
								dateColumn({ header: "Created At", accessor: "createdAt" }),
								dateColumn({ header: "Updated At", accessor: "updatedAt" }),
								{
									header: "Action",
									getRow: ({ row, ...rest }) => {
										return (
											<div className="flex gap-2 items-center">
												{showUI("modal", {
													...rest,
													icon: FaEdit,
													title: "Edit Task",
													buttonOverrideClass: "!bg-transparent",
													components: [
														{
															component: "form",
															formSchema: {
																taskName: {
																	label: "Task Name",
																	ui: "input",
																	type: "string",
																	constraints: {
																		required: true,
																	},
																},
																taskDescription: {
																	label: "Task Description",
																	ui: "textArea",
																	type: "string",
																	constraints: {
																		maxLength: 60,
																	},
																},
																status: {
																	ui: "input",
																	type: "string",
																	label: "Task status",
																},
															},
															module: "management",
															entity: "tasks",
															parentId: row?.taskId,
														},
													],
												})}
												<MdDelete
													size={20}
													className="cursor-pointer"
													onClick={() =>
														DeleteApiByPk({
															module: "management",
															entity: "tasks",
															id: row?.taskId,
														}).then((e) => setReload(reload + 1))
													}
												/>
											</div>
										);
									},
								},
							],
						},
					],
					triggerParentReload: () => setReload(reload + 1),
				})}
			</div>
		</div>
	);
}

export default App;
