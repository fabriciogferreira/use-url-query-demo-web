export const DOC_SECTIONS = [
	{ title: "Introduction", hash: "introduction" },
	{ title: "Installation", hash: "installation" },
	{ title: "Compatibility with nuqs", hash: "compatibility-with-nuqs" },
	{ title: "addFilter / removeFilter", hash: "add-filter-remove-filter" },
	{ title: "cycleSort", hash: "cycle-sort" },
	{ title: "Filtering — roadmap", hash: "future-filtering" },
	{ title: "Sorting — roadmap", hash: "future-sorting" },
	{ title: "Including relationships — roadmap", hash: "future-including" },
	{ title: "Selecting fields — roadmap", hash: "future-fields" },
	{ title: "Multi value delimiter — roadmap", hash: "future-delimiter" },
	{ title: "Spatie docs listing — checklist", hash: "future-spatie-listing" },
] as const

export type DocSectionHash = (typeof DOC_SECTIONS)[number]["hash"]

export const DOC_SECTION_HASHES = DOC_SECTIONS.map((section) => section.hash)

export const DOC_TITLE_BY_HASH: Record<string, string> = Object.fromEntries(
	DOC_SECTIONS.map((section) => [section.hash, section.title]),
)
