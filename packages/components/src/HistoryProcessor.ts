import { eventBus } from "@packages/utilities/lib/EventBus";
import { removeSpaceBetweenCapitalLetters } from "@packages/utilities/lib/util";
import {
	getHistory as getHistoryFromStorage,
	removeHistory as removeHistoryFromStorage,
	setHistory as setHistoryInStorage,
} from "@packages/services/lib/Api/utils/TokenStore";

export interface ILastVisited {
	url: string;
	timestamp: number;
	name?: string;
	pageName?: string;
}
export const UPDATE_HISTORY = "UPDATE_HISTORY";
const public_url_length = process.env.PUBLIC_URL
	? process.env.PUBLIC_URL.length
	: 0;
class HistoryProcessor {
	/**
	 *
	 */
	constructor() {
		const lastVisited = this.getHistory();
		setHistoryInStorage(lastVisited);
	}

	getHistory(): ILastVisited[] {
		const _lastVisited: ILastVisited[] = getHistoryFromStorage();
		return _lastVisited;
	}

	removeHistory(): ILastVisited[] {
		removeHistoryFromStorage();
		setHistoryInStorage([]);
		return [];
	}

	getUpdatedHistory(): ILastVisited[] {
		const url = window.location.pathname.slice(public_url_length);
		let name: string | undefined;
		let pageName: string | undefined;
		let lastVisited: ILastVisited[] = this.getHistory().filter((x) => {
			if (x.url === url) {
				name = x.name;
				pageName = x.pageName;
				return false;
			}
			return true;
		});

		lastVisited = [
			...lastVisited,
			{ url: url, timestamp: Date.now(), name, pageName },
		]
			.sort((a, b) => b.timestamp - a.timestamp)
			.filter((x, i) => i <= 20);
		setHistoryInStorage(lastVisited);

		return lastVisited;
	}

	findAndSetName(param: {
		url: string;
		name?: string | number;
		pageName?: string;
	}): void {
		const lastVisited = this.getHistory().map((x) => {
			if (x.url === param.url && typeof param.name === "string") {
				x.name = param.name ? param.name : x.name;
				x.pageName = param.pageName ? param.pageName : x.pageName;
			}
			return x;
		});
		setHistoryInStorage(lastVisited);
		eventBus.publish(UPDATE_HISTORY);
	}

	updateName(name?: string) {
		if (!name) return;

		const url = window.location.pathname.slice(public_url_length);

		const pageName: string[] = window.location.pathname.split("/").reverse();
		this.findAndSetName({
			url,
			name,
			pageName:
				pageName.length > 1 && pageName[1]
					? removeSpaceBetweenCapitalLetters(pageName[1])
					: undefined,
		});
	}
}

export const lastVisitedProcessor = new HistoryProcessor();
