export type RoadmapChecklistItem = {
	id: string
	title: string
	done: boolean
}

export type RoadmapSectionId =
	| "filtering"
	| "sorting"
	| "including"
	| "fields"

export type RoadmapSectionProgress = {
	id: RoadmapSectionId
	label: string
	hash: string
	items: RoadmapChecklistItem[]
}

export const roadmapSections: RoadmapSectionProgress[] = [
	{
		id: "filtering",
		label: "Filtering",
		hash: "future-filtering",
		items: [
			{ id: "add-filter-eq", title: "addFilter (=)", done: true },
			{ id: "remove-filter", title: "removeFilter", done: true },
			{ id: "operators", title: "Operator filters", done: false },
			{ id: "multi-value", title: "Multi-value filters", done: false },
			{
				id: "partial-modes",
				title: "Partial, beginsWith, endsWith, exact",
				done: false,
			},
			{
				id: "related-belongs-to",
				title: "Related keys & BelongsTo-style filters",
				done: false,
			},
			{
				id: "scopes-custom",
				title: "Scopes, trashed, callback & custom",
				done: false,
			},
			{
				id: "aliases-defaults",
				title: "Aliases, ignore, defaults, nullable",
				done: false,
			},
			{ id: "filter-groups", title: "Filter groups (OR / AND)", done: false },
			{ id: "richer-api", title: "Richer filter API", done: false },
		],
	},
	{
		id: "sorting",
		label: "Sorting",
		hash: "future-sorting",
		items: [
			{ id: "cycle-sort", title: "cycleSort", done: true },
			{
				id: "basic-multi",
				title: "Basic & multi-column sort",
				done: true,
			},
			{ id: "defaults", title: "Default sorts", done: false },
			{
				id: "allowed-safety",
				title: "Allowed sorts & safety",
				done: true,
			},
			{ id: "aliases", title: "Aliases", done: false },
			{ id: "custom", title: "Custom sorts", done: false },
			{
				id: "enable-disable",
				title: "Enable / disable without remove",
				done: false,
			},
		],
	},
	{
		id: "including",
		label: "Including relationships",
		hash: "future-including",
		items: [
			{
				id: "basic-multi",
				title: "Basic & multi includes",
				done: true,
			},
			{ id: "nested", title: "Nested relationships", done: false },
			{
				id: "count-exists",
				title: "Count & exists suffixes",
				done: false,
			},
			{
				id: "aggregates",
				title: "Aggregates (min, max, sum, avg)",
				done: false,
			},
			{
				id: "aliases-custom",
				title: "Aliases, custom & callback includes",
				done: false,
			},
			{
				id: "allowed-casing",
				title: "Allowed includes & casing",
				done: false,
			},
			{
				id: "enable-disable",
				title: "Enable / disable without remove",
				done: false,
			},
		],
	},
	{
		id: "fields",
		label: "Selecting fields",
		hash: "future-fields",
		items: [
			{
				id: "basic",
				title: "Basic field selection",
				done: true,
			},
			{
				id: "included-relations",
				title: "Fields for included relations",
				done: false,
			},
			{
				id: "allowed-safety",
				title: "Allowed fields & safety",
				done: true,
			},
			{
				id: "param-delimiters",
				title: "Param naming & delimiters",
				done: false,
			},
			{
				id: "enable-disable",
				title: "Enable / disable without remove",
				done: false,
			},
		],
	},
]

export function getSectionProgress(id: RoadmapSectionId) {
	const section = roadmapSections.find((entry) => entry.id === id)
	if (!section) {
		throw new Error(`Unknown roadmap section: ${id}`)
	}

	const total = section.items.length
	const done = section.items.filter((item) => item.done).length
	const percent = total === 0 ? 0 : Math.round((done / total) * 100)

	return {
		...section,
		done,
		total,
		percent,
	}
}

export function getSectionProgressByHash(hash: string) {
	const section = roadmapSections.find((entry) => entry.hash === hash)
	if (!section) {
		return null
	}
	return getSectionProgress(section.id)
}
