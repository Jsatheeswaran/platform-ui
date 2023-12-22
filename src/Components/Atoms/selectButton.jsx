const SelectButtonAtom = ({ overrideClass, title, onChange, disabled = false, option }) => {
	return (
		<div className={overrideClass}>
			<h3>{title}</h3>
			<select onChange={onChange} className={`py-1 px-2 rounded-md text-md bg-white border-2 border-blue-300`} disabled={disabled}>
				{option.map((opt, i) => {
					return (
						<option key={i} value={opt}>
							{opt}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default SelectButtonAtom;
