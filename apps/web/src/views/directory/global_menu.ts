import { createNewDirectoryInput } from "./edit";

import type { menu_entries } from "../../components/menu";

export default function globalContextMenu(): menu_entries {
	return [
		{
			display_name: "New Directory",
			pressed_callback: createNewDirectoryInput
		},
		{
			display_name: "Reload",
			pressed_callback: () => {
				document.location.reload();
			}
		}
	];
}
