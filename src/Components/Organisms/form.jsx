import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ActionApi } from "../../api";
import ButtonAtom from "../Atoms/button";
import { ComponentMap } from "../utils";

const generateValidationSchema = (schema) => {
	const validationSchema = {};
	if (schema)
		Object.entries(schema).map(([propertyName, propertySchema]) => {
			if (propertySchema?.constraints) {
				return (validationSchema[propertySchema?.accessor ?? propertyName] = generateFieldValidation({
					propertySchema,
				}));
			}
			return null;
		});

	return validationSchema;
};
const generateFieldValidation = ({ propertySchema, previousConstraints }) => {
	if (!previousConstraints) {
		previousConstraints = (YupMap[propertySchema.type] ? YupMap[propertySchema.type] : YupMap.string)(yup);
		return generateFieldValidation({ propertySchema, previousConstraints });
	}
	for (const constraint in propertySchema.constraints) {
		YupMap[constraint] ? (previousConstraints = YupMap[constraint](previousConstraints, propertySchema.constraints[constraint])) : null;
	}
	return previousConstraints;
};

const YupMap = {
	string: (e) => e.string().nullable(),
	maxLength: (e, v) => e.max(v, `Max character length is ${v}`),
	required: (e) => (e.required ? e.required("Mandatory") : yup.string().nullable().required("Mandatory")),
};

const generateFormFields = ({ formSchema = {}, register, errors }) => {
	if (!_.isEmpty(formSchema)) {
		return Object.entries(formSchema).map(([accessor, schema], i) => {
			const Component = ComponentMap[schema?.ui];
			return (
				<div key={`${accessor}_${i}`} className="flex flex-col gap-2">
					<label>{schema.label}</label>
					<Component register={register} name={accessor} />
					{errors[accessor] && <p>{errors[accessor].message}</p>}
				</div>
			);
		});
	}
	return null;
};

const FormOrganism = ({ formSchema, module, entity, buttonLabel = "Save", parentId = null, onAddTask, ...props }) => {
	const {
		handleSubmit,
		reset,
		formState: { errors },
		register,
	} = useForm({
		resolver: yupResolver(yup.object().shape(generateValidationSchema(formSchema))),
	});

	// useEffect(()=>{
	// 	if()
	// },[JSON.stringify(data)])

	const onSubmit = (data) => {
		console.log("🚀 ~ file: form.jsx:23 ~ onSubmit ~ data:", data);
		ActionApi({
			module,
			entity,
			data,
		});
		// Pass the form data to the parent component
		// onAddTask(data);

		// Reset the form after submitting
		// reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-10">{generateFormFields({ formSchema, register, errors })}</div>

			<div className="flex justify-center">
				<ButtonAtom type="submit" label={buttonLabel} />
			</div>
		</form>
	);
};

export default FormOrganism;
