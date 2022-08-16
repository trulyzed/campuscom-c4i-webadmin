import React from "react";
import { IField } from "~/packages/components/Form/common";
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton";
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types";

export const MetaDrivenFilterButton = (props: {
	searchTitle?: string;
	searchMeta: IField[];
	searchMetaName: string;
	defaultFormValue?: { [key: string]: any };
	initialFormValue?: { [key: string]: any };
	formSubmitApi: IQuery;
}) => {
	return (
		<>
			<MetaDrivenFormModalOpenButton
				iconType="filter"
				buttonLabel="Apply Filters"
				formTitle={props.searchTitle}
				formMeta={props.searchMeta}
				formMetaName={props.searchMetaName}
				defaultFormValue={props.defaultFormValue}
				initialFormValue={props.initialFormValue}
				formSubmitApi={props.formSubmitApi}
			/>
		</>
	);
};
