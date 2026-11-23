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

const SORT_EXAMPLES = `// Planned URL shapes (Spatie)
// GET /users?sort=-name
// GET /users?sort=name,-street

toggleSort("name")
toggleSortDirection("name")
// → sort=-name`

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
					Nothing in this area is part of the shipped demo surface yet —
					today only{" "}
					<code className="font-mono text-xs">addFilter</code> /{" "}
					<code className="font-mono text-xs">removeFilter</code> are
					documented as available.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Planned</h3>
				<ul className="flex flex-col gap-4">
					<RoadmapItem title="Basic & multi-column sort">
						<p>
							Build{" "}
							<code className="font-mono text-xs">sort=name</code>,{" "}
							<code className="font-mono text-xs">sort=-name</code>, and
							comma-separated multi-sorts like{" "}
							<code className="font-mono text-xs">
								sort=name,-street
							</code>
							. Helpers such as{" "}
							<code className="font-mono text-xs">toggleSort</code>,{" "}
							<code className="font-mono text-xs">
								toggleSortDirection
							</code>
							, and move up/down for sort priority.
						</p>
						<CodeBlock className="mt-2">
							<CodeBlockHeader>
								<CodeBlockTitle>sort</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton value={SORT_EXAMPLES} />
								</CodeBlockActions>
							</CodeBlockHeader>
							<CodeBlockContent wrap>{SORT_EXAMPLES}</CodeBlockContent>
						</CodeBlock>
					</RoadmapItem>

					<RoadmapItem title="Default sorts">
						Apply Spatie-style defaults when the URL has no{" "}
						<code className="font-mono text-xs">sort</code> — including
						descending defaults (
						<code className="font-mono text-xs">defaultSort(&apos;-name&apos;)</code>
						) and multiple default columns.
					</RoadmapItem>

					<RoadmapItem title="Allowed sorts &amp; safety">
						Only columns listed in the hook config participate; unknown sort
						keys are ignored or surfaced for debugging (mirroring Spatie’s
						allowed / disallowed sort behaviour on the client).
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
				</ul>
			</div>
		</section>
	)
}
