import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@/components/ui/code-block"
import { RoadmapItem } from "./roadmap-item"
import { SectionProgress } from "./section-progress"

const SPATIE_SORTING_URL =
	"https://spatie.be/docs/laravel-query-builder/v6/features/sorting"

const CURRENT_SURFACE = `cycleSort("name")
// off → sort=name → sort=-name → off`

const SORT_EXAMPLES = `// Still available primitives
toggleSort("name")
toggleSortDirection("name")
moveSortUp("name")
moveSortDown("name")
`

export function SortingRoadmap() {
	return (
		<section
			id="future-sorting"
			className="flex scroll-mt-24 flex-col gap-6"
		>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold tracking-tight">
						Sorting — roadmap
					</h2>
					<SectionProgress sectionId="sorting" />
				</div>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Aligned with Spatie’s{" "}
					<a
						href={SPATIE_SORTING_URL}
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Sorting
					</a>{" "}
					docs. Ascending by default; a leading hyphen (
					<code className="font-mono text-xs">-</code>) means descending.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Available today</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Catalog + activation via{" "}
					<code className="font-mono text-xs">cycleSort</code> (demo
					allows only{" "}
					<code className="font-mono text-xs">name</code>). Also{" "}
					<code className="font-mono text-xs">toggleSort</code>,{" "}
					<code className="font-mono text-xs">toggleSortDirection</code>
					, and move helpers.
				</p>
				<CodeBlock>
					<CodeBlockHeader>
						<CodeBlockTitle>current</CodeBlockTitle>
						<CodeBlockActions>
							<CodeBlockCopyButton value={CURRENT_SURFACE} />
						</CodeBlockActions>
					</CodeBlockHeader>
					<CodeBlockContent wrap>{CURRENT_SURFACE}</CodeBlockContent>
				</CodeBlock>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Planned</h3>
				<ul className="flex flex-col gap-4">
					<RoadmapItem title="Default sorts">
						Apply Spatie-style defaults when the URL has no{" "}
						<code className="font-mono text-xs">sort</code> — including
						descending defaults (
						<code className="font-mono text-xs">
							defaultSort(&apos;-name&apos;)
						</code>
						) and multiple default columns.
					</RoadmapItem>

					<RoadmapItem title="Aliases">
						Expose a short public sort name in the URL while mapping to a
						different backend column — same idea as{" "}
						<code className="font-mono text-xs">
							AllowedSort::field(&apos;street&apos;,
							&apos;actual_column_street&apos;)
						</code>
						.
					</RoadmapItem>

					<RoadmapItem title="Custom sorts">
						Support custom sort param names that map to Spatie{" "}
						<code className="font-mono text-xs">AllowedSort::custom()</code>{" "}
						on the API (e.g.{" "}
						<code className="font-mono text-xs">sort=name-length</code>),
						including a default direction per custom sort.
					</RoadmapItem>

					<RoadmapItem title="Enable / disable without remove">
						Keep a sort in the client state but omit it from{" "}
						<code className="font-mono text-xs">queryString</code> (useful
						while testing), matching the planned disable pattern for
						filters / includes / fields.
					</RoadmapItem>

					<RoadmapItem title="Primitives still in the API">
						<p>
							<code className="font-mono text-xs">toggleSort</code> /{" "}
							<code className="font-mono text-xs">
								toggleSortDirection
							</code>{" "}
							remain for finer control alongside{" "}
							<code className="font-mono text-xs">cycleSort</code>.
						</p>
						<CodeBlock className="mt-2">
							<CodeBlockHeader>
								<CodeBlockTitle>primitives</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton value={SORT_EXAMPLES} />
								</CodeBlockActions>
							</CodeBlockHeader>
							<CodeBlockContent wrap>{SORT_EXAMPLES}</CodeBlockContent>
						</CodeBlock>
					</RoadmapItem>
				</ul>
			</div>
		</section>
	)
}
