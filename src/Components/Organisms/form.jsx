import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ActionApi, ActionApiByPk, QueryApiByPk } from "../../api";
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
					{errors[accessor] && <p className="text-red-600">{errors[accessor].message}</p>}
				</div>
			);
		});
	}
	return null;
};

const FormOrganism = ({
	formSchema,
	module,
	entity,
	buttonLabel = "",
	parentId = null,
	toggleModal = () => {},
	triggerParentReload = () => {},
	...props
}) => {
	const {
		handleSubmit,
		watch,
		reset,
		formState: { errors, isDirty, isValid, dirtyFields },
		register,
	} = useForm({
		resolver: yupResolver(yup.object().shape(generateValidationSchema(formSchema))),
	});

	const [parentRecord, setParentRecord] = useState({});

	useEffect(() => {
		if (parentId) {
			QueryApiByPk({
				module,
				entity,
				id: parentId,
			}).then((e) => {
				if (!_.isEmpty(e)) {
					reset(e);
					// setParentRecord(parentRecord)
				}
			});
		}
	}, [parentId]);

	const onSubmit = (data) => {
		(parentId ? ActionApiByPk : ActionApi)({
			module,
			entity,
			data,
			id: parentId,
		}).then((e) => {
			triggerParentReload();
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-5">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10">{generateFormFields({ formSchema, register, errors })}</div>

				<div className="flex justify-center gap-5">
					{isDirty && !_.isEmpty(dirtyFields) && (
						<ButtonAtom
							label={buttonLabel || parentId ? "Reset" : "Cancel"}
							overrideClass="bg-white border-2 border-blue-300"
							onClick={(e) => reset()}
						/>
					)}
					{isDirty && !_.isEmpty(dirtyFields) && <ButtonAtom type="submit" label={buttonLabel || parentId ? "Save" : "Add"} />}
				</div>
			</div>
		</form>
	);
};
export default FormOrganism;
