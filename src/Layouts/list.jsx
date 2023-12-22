import _ from "lodash";
import React, { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import ButtonAtom from "../Components/Atoms/button";
import SelectButtonAtom from "../Components/Atoms/selectButton";
import TableOrganism from "../Components/Organisms/table";
import { showUIList } from "../Components/utils";
import { ListApi } from "../api";

const ListLayout = ({ module = "", entity = "", title = "", columns = [], triggerParentReload = () => {}, components = [], ...rest }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	useEffect(() => {
		const fetchData = async () => {
			const res = await ListApi({
				module,
				entity,
				page,
				limit,
			});
			if (!_.isEmpty(res)) {
				setData(res.data);
				setTotal(res.total);
				setLoading(false);
			}
		};

		fetchData();
	}, [page, limit]);

	const totalPages = Math.ceil(total / limit);
	const calculateVisiblePages = () => {
		const totalVisibleButtons = 5;
		const visiblePages = [];
		const halfVisibleButtons = Math.floor(totalVisibleButtons / 2);

		let startPage = Math.max(1, page - halfVisibleButtons);
		let endPage = Math.min(startPage + totalVisibleButtons - 1, totalPages);

		// Adjust the startPage if the endPage reaches totalPages
		startPage = Math.max(1, endPage - totalVisibleButtons + 1);

		for (let i = startPage; i <= endPage; i++) {
			visiblePages.push(i);
		}
		return visiblePages;
	};

	const [visiblePages, setVisiblePages] = useState(calculateVisiblePages());

	useEffect(() => {
		setVisiblePages(calculateVisiblePages());
	}, [page, totalPages]);
	const prevpage = () => {
		setPage(page - 1 < 0 ? 0 : page - 1);
	};

	const nextpage = () => {
		setPage(page >= totalPages ? totalPages - 1 : page + 1);
	};

	return (
		<>
			<div className="flex justify-between bg-blue-100 p-3">
				<div className="text-xl font-semibold text-gray-600">
					{title} [{data?.length} / {total}]
				</div>
				<div>{showUIList({ components: components, triggerParentReload, ...rest })}</div>
			</div>
			<div className="px-3 py-2">
				<TableOrganism data={data} columns={columns} loading={loading} />
				<div className="flex justify-center gap-9 mt-3">
					<SelectButtonAtom
						overrideClass={"flex items-center gap-3"}
						title={"Limit:"}
						onChange={(e) => {
							setLimit(e.target.value);
							setPage(1);
						}}
						option={[5, 10, 15, 20]}
					/>
					<div className="flex gap-3">
						{page !== 1 && (
							<ButtonAtom
								onClick={prevpage}
								disabled={page === 1}
								className="border px-4 py-2 rounded-lg mr-1"
								overrideClass="bg-blue-300"
								label={"prev"}
								Icon={GrFormPrevious}
							/>
						)}
						{visiblePages.map((pageNum, index) => (
							<ButtonAtom
								key={index}
								onClick={() => {
									setPage(pageNum);
								}}
								className={pageNum === page ? "active" : "inactive"}
								overrideClass={pageNum === page ? "bg-blue-200" : "bg-blue-50"}
								label={pageNum}
							/>
						))}
						{page + 1 === totalPages && (
							<ButtonAtom
								onClick={nextpage}
								className={"border px-4 py-2 rounded-lg ml-1"}
								overrideClass="bg-blue-300"
								label="Next"
								Icon={MdOutlineNavigateNext}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ListLayout;
