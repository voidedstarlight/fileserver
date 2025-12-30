import createDirectoryView from "./view";
import grid_view_icon from "./grid_view.svg";
import list_view_icon from "./list_view.svg";

import {
	addToolbarIcon,
	addToolbarStretch,
	initiateToolbar
} from "../../components/toolbar";

import { initiateDownloader } from "../../util/dom/downloader";
import { initiateSidebar } from "../../components/sidebar";
import { prepareUploadElement } from "./upload";

interface DirectoryData {
	data: Record<string, boolean>;
	type: "directory";
}

function populateToolbar() {
	addToolbarStretch();

	const grid_view_icon_path = grid_view_icon;
	const grid_view = addToolbarIcon(grid_view_icon_path, () => {
		if (localStorage.directory_view !== "grid") {
			localStorage.directory_view = "grid";
			document.location.reload();
		}
	}, "45%");

	const list_view_icon_path = list_view_icon;
	const list_view = addToolbarIcon(list_view_icon_path, () => {
		if (localStorage.directory_view !== "list") {
			localStorage.directory_view = "list";
			document.location.reload();
		}
	}, "45%");

	if (localStorage.directory_view === "grid") {
		grid_view.classList.add("selected");
	} else {
		list_view.classList.add("selected");
	}
}

export default function loadDirectory(data: DirectoryData) {
	import("./view.css").catch((error: unknown) => {
		console.error("[directory/init] failed to load css file:");
		throw error;
	});

	createDirectoryView(data.data);

	initiateSidebar();
	initiateToolbar();
	populateToolbar();

	initiateDownloader();
	prepareUploadElement();
}
