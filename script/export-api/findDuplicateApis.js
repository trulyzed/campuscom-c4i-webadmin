const service = require("./nextRelease/service.json");
const bizapi = require("./nextRelease/bizapi.json");
const fs = require("fs");

const api = [...service, ...bizapi];

let collection = {};
api.forEach((x) => {
	if (!collection[x.Action]) {
		collection[x.Action] = [x.Service];
	} else {
		collection[x.Action].push(x.Service);
	}
});

let duplicateCollection = {};
Object.keys(collection).forEach((key) => {
	if (collection[key].length > 1) {
		duplicateCollection[key] = collection[key];
	}
});

console.log(duplicateCollection);
fs.writeFileSync(
	`./nextRelease/duplicateApis.json`,
	JSON.stringify(duplicateCollection)
);
