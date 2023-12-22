const ButtonAtom = ({ overrideClass = "", onClick = () => {}, type = "button", disabled = false, label = "Button" }) => {
	return (
		<button onClick={onClick} className={`py-1 px-2 rounded-md text-md bg-blue-300 ${overrideClass}`} disabled={disabled} type={type}>
			{label}
		</button>
	);
};
export default ButtonAtom;
