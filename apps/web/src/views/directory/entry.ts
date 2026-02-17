import { main } from "../../util/dom/sectioning";

import createContextMenu from "../../components/menu";
import fileContextMenu from "./file_menu";
import filetype from "../../util/filetype";
import isEditing from "./edit";

import directory_icon from "./directory.svg";

import {
	getSelectedElements,
	isMultiSelecting,
	isSelectingBetween,
	select
} from "./selection/modify";

function navigateToRelative(name: string) {
	if (!isEditing()) {
		let { pathname } = document.location;

		if (!pathname.endsWith("/")) {
			pathname = `${pathname}/`;
		}

		document.location = pathname + name;
	}
}

function selectBetween(target: HTMLElement) {
	const selected = getSelectedElements();

	if (!selected.length) {
		select([target]);
		return;
	}

	console.log(target);

	const most_recent = selected.at(-1);
	const entry_container = most_recent.parentElement;

	let found_start = false;

	const found_elements: Array<HTMLElement> = [];

	console.log(most_recent);

	for (const entry of entry_container.children) {
		if (entry === target || entry === most_recent) {
			if (found_start) {
				found_elements.push(entry);
				break;
			}

			found_start = true;
		}

		if (found_start) {
			found_elements.push(entry);
		}
	}

	select(found_elements, isMultiSelecting());
}

function selectItem(button: number, element: HTMLElement) {
	if (button !== 1 && !element.classList.contains("selected")) {
		if (isSelectingBetween()) {
			selectBetween(element);
			return;
		}

		select([element], isMultiSelecting());
	}
}

function assignFileIcon(filename: string) {
	for (const extension of ["jpeg", "jpg", "png", "rtf", "svg", "text", "txt"]) {
		if (filename.endsWith(`.${extension}`)) {
			return `/a/img/extensions/${extension}.svg`;
		}
	}

	return "/a/img/extensions/*.svg";
}

export function appendGridViewEntry(name: string, is_directory: boolean) {
	const button = document.createElement("button");
	button.title = name;

	if (name.startsWith(".")) {
		button.classList.add("hidden");
	}

	button.addEventListener("mousedown", event => {
		selectItem(event.button, button);

		if (event.button === 2) {
			createContextMenu(event, fileContextMenu(event));
			event.stopPropagation();
		}
	});

	button.addEventListener("dblclick", () => {
		navigateToRelative(name);
	});

	const file_icon_container = document.createElement("figure");
	button.appendChild(file_icon_container);

	const file_icon = document.createElement("img");

	if (is_directory) {
		file_icon.src = directory_icon;
	} else {
		file_icon.src = assignFileIcon(name);
	}

	file_icon_container.appendChild(file_icon);

	const text_container = document.createElement("span");
	text_container.innerText = name;
	button.appendChild(text_container);

	main.appendChild(button);

	return button;
}

export function appendListViewEntry(name: string, is_directory: boolean) {
	const row = document.createElement("div");

	row.addEventListener("mousedown", event => {
		selectItem(event.button, row);

		if (event.button === 2) {
			createContextMenu(event, fileContextMenu(event));
			event.stopPropagation();
		}
	});

	row.addEventListener("dblclick", () => {
		navigateToRelative(name);
	});

	if (name.startsWith(".")) {
		row.classList.add("hidden");
	}

	const file_icon = document.createElement("img");

	if (is_directory) {
		file_icon.src = directory_icon;
	} else {
		file_icon.src = assignFileIcon(name);
	}

	row.appendChild(file_icon);

	const filename = document.createElement("p");
	filename.innerText = name;
	filename.title = name;
	row.appendChild(filename);

	const format = document.createElement("p");

	if (is_directory) {
		format.innerText = "Directory";
	} else {
		filetype(name).then(result => {
			format.innerText = result;
		}).catch(() => {
			format.innerText = "Unknown";
		});
	}

	row.appendChild(format);

	main.appendChild(row);

	return row;
}
