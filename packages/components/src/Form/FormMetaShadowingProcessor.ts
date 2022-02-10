import { useEffect, useState } from "react";
// import axios from "axios"
import { Rule } from "antd/lib/form";
import { IField } from "~/Form/common";
// import { baseURL } from "@packages/api/lib/utils/ApiMethodFactory"
import { eventBus } from "@packages/utilities/lib/EventBus";
import { getPreferences } from "@packages/api/lib/ApiService/PreferenceService";

export interface IUserFormMetaConfig {
	fieldName: string;
	label?: string;
	sortOrder?: number;
	placeholder?: string;
	ariaLabel?: string;
	hidden?: boolean;
	displayKey?: string;
	required?: boolean;
	defaultValue?: any;
}

async function getUserFormMetaConfig(
	metaName: string
): Promise<{ [key: string]: any }> {
	let userFormMeta: { [key: string]: any } = {};
	const response = await getPreferences({ PreferenceKey: metaName });
	if (response.success && response.data !== "") userFormMeta = response.data;
	// try {
	//   const _fileMap = (await axios.request({ baseURL, url: `/webconfig/Config/fileMap.json` })).data
	//   if (_fileMap && _fileMap[metaName]) {
	//     userFormMeta = (await axios.request({ baseURL, url: `/webconfig${_fileMap[metaName]}` })).data
	//     // console.log("userFormMeta ", userFormMeta)
	//   }
	// } catch (error) {
	//   // console.error("userFormMeta error ", error)
	// }

	if (userFormMeta && Object.keys(userFormMeta).length > 0) {
		Object.keys(userFormMeta).forEach((key: string) => {
			const config = userFormMeta[key];
			if (
				!(
					("label" in config && typeof config["label"] === "string") ||
					("sortOrder" in config && typeof config["sortOrder"] === "number") ||
					("placeholder" in config &&
						typeof config["placeholder"] === "string") ||
					("ariaLabel" in config && typeof config["ariaLabel"] === "string") ||
					("hidden" in config && typeof config["hidden"] === "boolean") ||
					("displayKey" in config &&
						typeof config["displayKey"] === "string") ||
					("required" in config && typeof config["required"] === "boolean")
				)
			)
				delete userFormMeta[key];
		});
	}
	return Promise.resolve(userFormMeta);
}

function FormMetaShadowingProcessor(
	meta: IField[],
	userMetaConfig: { [key: string]: any }
): IField[] {
	return meta
		.map((x) => {
			if (userMetaConfig && userMetaConfig[x.fieldName]) {
				userMetaConfig[x.fieldName].fieldName = x.fieldName;
				const { required, ...others } = userMetaConfig[x.fieldName];
				x = { ...x, ...(others as IField) };
				if (required) {
					const rule: Rule = {
						required: true,
						message: `Please input ${x.label}`,
					};
					if (x.rules && x.rules?.length) {
						x.rules.push(rule);
					} else {
						x.rules = [rule];
					}
				} else if (required === false && x.rules && x.rules.length > 0) {
					x.rules = x.rules.filter((r: any) => !r.required);
				}
			}
			return x;
		})
		.sort((a, b) => (a.sortOrder || 1000) - (b.sortOrder || 1000));
}

export function processFormMetaWithUserMetaConfig(
	meta: IField[],
	metaName: string
): Promise<IField[]> {
	return getUserFormMetaConfig(metaName).then((x) =>
		FormMetaShadowingProcessor(meta, x)
	);
}

function customFormConfigProcessor(
	formFields: { [key: string]: any },
	userMetaConfig: { [key: string]: any }
): { [key: string]: IUserFormMetaConfig } {
	const newConfig: { [key: string]: any } = {};
	for (const field in formFields) {
		if (userMetaConfig && userMetaConfig[field]) {
			newConfig[field] = userMetaConfig[field];
		} else {
			newConfig[field] = {};
		}
	}
	return newConfig;
}

export const REFRESH_CUSTOM_FROM_CONFIG_HOOK =
	"REFRESH_CustomFormConfigHook1232123123";

export function CustomFormConfigHook(
	formFields: { [key: string]: any },
	formName: string
) {
	const [formFieldConfig, setFormFieldConfig] = useState<{
		[key: string]: any;
	}>({});
	useEffect(() => {
		eventBus.subscribe(REFRESH_CUSTOM_FROM_CONFIG_HOOK, () => {
			getUserFormMetaConfig(formName)
				.then((x) => customFormConfigProcessor(formFields, x))
				.then(setFormFieldConfig);
		});
		eventBus.publish(REFRESH_CUSTOM_FROM_CONFIG_HOOK);
		return () => {
			eventBus.unsubscribe(REFRESH_CUSTOM_FROM_CONFIG_HOOK);
		};
	}, [formFields, formName]);
	return formFieldConfig;
}
