import { showUIList } from "./Components/utils";

function App() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Task Table</h1>
			{showUIList({
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
					{
						component: "table",
						module: "management",
						entity: "tasks",
						columns: [
							{ header: "Task Name", accessor: "taskName" },
							{ header: "Description", accessor: "taskDescription" },
							{ header: "Status", accessor: "status" },
							{ header: "Created At", accessor: "createdAt" },
							{ header: "Updated At", accessor: "updatedAt" },
						],
					},
				],
			})}
		</div>
	);
}

export default App;
