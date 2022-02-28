import { IApiResponse } from "@packages/api/lib/utils/Interfaces";
import { IDetailsSummary } from "~/Page/DetailsPage/DetailsPageInterfaces";
import { IDetailsCustomTabProp } from "~/Page/DetailsPage/DetailsCustomTab";
import { IDetailsSearchTabProp } from "~/Page/DetailsPage/DetailsSearchTab";
import { IDetailsTableTabProp } from "~/Page/DetailsPage/DetailsTableTab";

export const tabTypes = {
	summary: "summary",
	table: "table",
	searchtable: "searchtable",
	custom: "custom",
};

type TabType = "summary" | "table" | "searchtable" | "custom";
export interface IDetailsTabMeta {
	tabType: TabType;
	tabTitle: string;
	tabMeta?:
		| IDetailsTableTabProp
		| IDetailsSummary
		| IDetailsSearchTabProp
		| IDetailsCustomTabProp; // | any
	multipleTabMetas?: IDetailsTabMeta[];
	actions?: JSX.Element[];
	helpKey?: string;
}

export interface IDetailsMeta {
	pageTitle?: string;
	tabs: IDetailsTabMeta[];
}

export interface IDetailsPage {
	getMeta: (
		Params: any,
		entityType?: string,
		entityID?: number
	) => IDetailsMeta;
	getDetailsPageContent: () => Promise<IApiResponse>;
	entityType?: string;
	entityID?: number;
	titleKey?: string;
	actions?: JSX.Element[];
	refreshEventName?: string;
	onDataLoad?: (data?: any) => void;
}
