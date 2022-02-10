const fs = require("fs");
const path = require("path");

const getAllFiles = function (dirPath, arrayOfFiles) {
	files = fs
		.readdirSync(dirPath)
		.filter((x) => !(x.includes(".ts") || x.includes(".map")));

	arrayOfFiles = arrayOfFiles || [];

	files.forEach(function (file) {
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
		} else {
			arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
		}
	});

	return arrayOfFiles;
};

const getAllApiConfigs = (fileNames, jsonFileName) => {
	let apiConfigXML = "<root>";
	for (fileName of fileNames) {
		const { config } = require(fileName);
		if (config && config.Actions) {
			Object.keys(config.Actions).forEach((x) => {
				apiConfigXML += `
			<method name="add">
				<object
						class="java.util.HashMap"
						interface="java.lang.Object" >
						<constructor>
								<map>
										<entry key="Service" value="${config.Service}" />
										<entry key="Action" value="${x}" />
								</map>
						</constructor>
				</object>
			</method>`;
			});
		} else {
			console.error("Problem with this config ", config, fileName);
		}
	}
	apiConfigXML += "</root>";
	fs.writeFileSync(`./nextRelease/${jsonFileName}.xml`, apiConfigXML);
};

const serviceConfigFileNames = getAllFiles(
	"../../packages/api/lib/proxy/Service"
);
const bizApiConfigFileNames = getAllFiles(
	"../../packages/api/lib/proxy/BizApi"
);

getAllApiConfigs(serviceConfigFileNames, "service");
getAllApiConfigs(bizApiConfigFileNames, "bizapi");
