import fs from "fs";
import express from "express";
import { getRouteMethod } from "@src/utils/urls";
import { upperCase } from "lodash";

const routes = express.Router();
// Read all folder
const folders = fs.readdirSync(__dirname);

for (const folder of folders) {
	if (folder === "index.ts") continue;

	import(`@src/routes/${folder}`).then((router) => {
		routes.use(`/${folder}`, router.default);
		console.log(
			folder,
			"routes are ready",
			router.default.stack
				?.map(
					(x: any) =>
						`${x.route.path} - ${upperCase(getRouteMethod(x.route.methods))}`
				)
				.join(" - ")
		);
	});
}

export default routes;
