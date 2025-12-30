import createErrorElement from "./error";
import current_path from "./util/path";
import loadDirectory from "./views/directory/index";
import loadFile from "./views/file/index";

import "./components/menu";

import "./layout.css";

interface DirectoryData {
	data: Record<string, boolean>;
	type: "directory";
}

interface FileData {
	encoding: string;
	size: number;
	type: "file";
}

const title_element = document.getElementsByTagName("title")[0];

if (title_element) {
	title_element.innerText = `${current_path} on ${document.location.hostname}`;
}

fetch(`/data${current_path}`).then(async response => {
	if (!response.ok) {
		createErrorElement(response.status);
		return;
	}

	const data = await response.json() as DirectoryData | FileData;

	if (data.type === "directory") {
		loadDirectory(data);
	} else {
		await loadFile();
	}
}).catch((error: unknown) => {
	console.error("[view/init] could not retrive data for current path:");
	throw error;
});
