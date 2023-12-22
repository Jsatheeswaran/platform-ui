import dayjs from "dayjs";
import _ from "lodash";
import InputAtom from "./Atoms/input";
import TextAreaAtom from "./Atoms/textArea";
import ModalMolecule from "./Molecules/modal";
import FormOrganism from "./Organisms/form";
import TableOrganism from "./Organisms/table";
import { UI_HUMAN_DATETIME_FORMAT } from "./particles/constant";
export const showUIList = ({ components = [], ...rest }) =>
	_.isArray(components) && !_.isEmpty(components) ? components.map((e, i) => showUI(e?.component, { key: i, ...e, ...rest })) : null;
export const showUI = (name, props) => {
	const newProps = { ...props };
	switch (name) {
		case "modal":
			return <ModalMolecule {...newProps} />;
		case "form":
			return <FormOrganism {...newProps} />;
		case "table":
			return <TableOrganism {...newProps} />;
		default:
			return <></>;
	}
};

export const ComponentMap = {
	input: InputAtom,
	textArea: TextAreaAtom,
};

export const dateColumn = (props) => {
	return {
		...props,
		getCell: (value) => {
			return <span>{dayjs(value).format(UI_HUMAN_DATETIME_FORMAT)}</span>;
		},
	};
};
