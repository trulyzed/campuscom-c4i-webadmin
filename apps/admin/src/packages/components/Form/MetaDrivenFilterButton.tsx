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
				buttonLabel="Search Filters"
				formTitle={props.searchTitle}
				formMeta={props.searchMeta}
				formMetaName={props.searchMetaName}
				defaultFormValue={props.defaultFormValue}
				initialFormValue={props.initialFormValue}
				formSubmitApi={props.formSubmitApi}
			/>
			<div
				style={{
					borderRadius: "20px",
					margin: "auto",
					width:
						props.initialFormValue &&
							Object.keys(props.initialFormValue).length > 9
							? "30px"
							: "20px",
					height: "20px",
					fontSize: "12px",
					position: "absolute",
					top: "-5px",
					right: "0px",
				}}
				className={"filter-counter"}
			>
				<span>
					{props.initialFormValue
						? Object.keys(props.initialFormValue).length
						: 0}
				</span>
			</div>
		</>
	);
};
