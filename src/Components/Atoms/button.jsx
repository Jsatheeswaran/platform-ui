const ButtonAtom = ({ overrideClass = "", onClick = () => {}, Icon = null, type = "button", disabled = false, label = "Button" }) => {
	return (
		<button
			onClick={onClick}
			className={`py-1 px-2 rounded-md text-md bg-blue-300 text-gray-600 ${overrideClass}`}
			disabled={disabled}
			type={type}
		>
			{Icon ? <Icon size={20} /> : label}
		</button>
	);
};
export default ButtonAtom;
