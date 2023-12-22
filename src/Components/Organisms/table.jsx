import _ from "lodash";
import React, { useEffect, useState } from "react";
import { QueryApi } from "../../api";

const TableOrganism = ({ module = "", entity = "", columns = [], ...rest }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const res = await QueryApi({
				module,
				entity,
			});
			if (!_.isEmpty(res)) {
				setData(res);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			{loading ? (
				<p>Loading...</p>
			) : (
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
								<tr
									key={rowIndex}
									className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
								>
									{columns?.map((column, colIndex) => (
										<td key={colIndex} className="px-6 py-4">
											{row?.[column.accessor] || ""}
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
