export default function load(source: string): HTMLEmbedElement {
	import("../../../../css/file/loaders/pdf.scss").catch((error: unknown) => {
		console.error("[file/pdf] failed to load css file:");
		throw error;
	});

	const embed = document.createElement("embed");
	embed.src = source;
	return embed;
}
