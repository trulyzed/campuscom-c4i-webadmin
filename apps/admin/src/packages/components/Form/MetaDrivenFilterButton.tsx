import React from "react";
import { IField } from "~/packages/components/Form/common";
import { IApiResponse } from "~/packages/services/Api/utils/Interfaces";
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton";

export const MetaDrivenFilterButton = (props: {
	searchTitle?: string;
	searchMeta: IField[];
	searchMetaName: string;
	defaultFormValue?: { [key: string]: any };
	initialFormValue?: { [key: string]: any };
	formSubmitApi: (param: { [key: string]: any }) => Promise<IApiResponse>;
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
					border: "1px solid",
					borderRadius: "20px",
					padding: "0px 5px",
					margin: "auto",
					display: "block",
					width:
						props.initialFormValue &&
							Object.keys(props.initialFormValue).length > 9
							? "30px"
							: "20px",
					height: "20px",
					backgroundColor: "white",
					color: "black",
					fontSize: "12px",
					position: "absolute",
					top: "-5px",
					right: "0px",
				}}
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
