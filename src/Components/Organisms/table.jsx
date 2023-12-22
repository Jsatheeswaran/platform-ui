import React from "react";
const TableOrganism = ({ columns = [], data = [], loading, ...rest }) => {
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			{loading ? (
				<p>Loading...</p>
			) : (
				<table className="w-full text-sm text-left rtl:text-right text-gray-600">
					<thead className="text-xs uppercase  bg-blue-300">
						<tr>
							{columns.map((column, index) => (
								<th key={`${column?.header?.substring(0, 3)}_${index}`} scope="col" className="px-6 py-3">
									{column?.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data?.length > 0 ? (
							data.map((row, rowIndex) => (
								<tr key={rowIndex} className="bg-white border-b border-gray-200">
									{columns?.map((column, colIndex) => (
										<td key={colIndex} className="px-6 py-4">
											{column?.getCell
												? column?.getCell(row?.[column.accessor] || "")
												: column?.getRow
												? column?.getRow({ row, ...rest })
												: row?.[column.accessor] || ""}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={columns.length} className="p-2 text-center">
									No Records
								</td>
							</tr>
						)}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TableOrganism;
