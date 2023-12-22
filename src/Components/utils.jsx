import _ from "lodash";
import InputAtom from "./Atoms/input";
import TextAreaAtom from "./Atoms/textArea";
import FormOrganism from "./Organisms/form";
import TableOrganism from "./Organisms/table";
export const showUIList = ({ components = [], ...rest }) =>
	_.isArray(components) && !_.isEmpty(components) ? components.map((e, i) => showUI(e?.component, { key: i, ...e, ...rest })) : null;
export const showUI = (name, props) => {
	const newProps = { ...props };
	switch (name) {
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
