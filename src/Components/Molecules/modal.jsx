import { useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import ButtonAtom from "../Atoms/button";
import { showUIList } from "../utils";
Modal.setAppElement("#root");
const ModalMolecule = ({
	buttonLabel = "",
	shouldCloseOnOverlayClick = false,
	children = null,
	closeButton = true,
	buttonDisabled = false,
	buttonIcon,
	overrideClass = "",
	confirmationPopupConfig = {},
	icon = null,
	buttonOverrideClass = "",
	title = "Modal",
	...rest
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);
	return (
		<>
			<Modal
				isOpen={isOpen}
				preventScroll
				onRequestClose={toggleModal}
				shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
				className={` z-50 m-5  ${overrideClass}`}
			>
				<div className="flex justify-between items-center bg-blue-300 p-2">
					<div className="">{title}</div>
					<div className="">
						{closeButton ? (
							<ButtonAtom
								label={"close"}
								Icon={MdClose}
								iconAlign="right"
								onClick={toggleModal}
								overrideClass="bg-red-600 !text-white"
							/>
						) : null}
					</div>
				</div>

				<div className="bg-white p-4">{showUIList({ ...rest, toggleModal })}</div>
			</Modal>

			{
				<ButtonAtom
					overrideClass={buttonOverrideClass}
					{...rest}
					Icon={icon}
					label={buttonLabel}
					disabled={buttonDisabled}
					onClick={toggleModal}
				/>
			}
		</>
	);
};

export default ModalMolecule;
