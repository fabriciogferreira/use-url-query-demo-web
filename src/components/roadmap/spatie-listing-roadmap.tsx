import { RoadmapItem } from "./roadmap-item"

const SPATIE_FRONT_END_DOCS_URL =
	"https://github.com/spatie/laravel-query-builder/blob/main/docs/advanced-usage/front-end-implementation.md"

const SPATIE_FRONT_END_DOCS_SITE =
	"https://spatie.be/docs/laravel-query-builder/v6/advanced-usage/front-end-implementation"

export function SpatieListingRoadmap() {
	return (
		<section
			id="future-spatie-listing"
			className="flex scroll-mt-24 flex-col gap-6"
		>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold tracking-tight">
					Spatie docs listing — checklist
				</h2>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Last step after the hook covers the Spatie surface: get{" "}
					<code className="font-mono text-xs">
						@fabriciogferreira/use-url-query
					</code>{" "}
					listed on the official{" "}
					<a
						href={SPATIE_FRONT_END_DOCS_SITE}
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Front-end implementation
					</a>{" "}
					page (alongside elodo, cogent-js, react-query-builder, …).
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Checklist</h3>
				<ul className="flex flex-col gap-4">
					<RoadmapItem title="Ship a solid React + Next.js entry">
						Filters, sorts, includes, fields, and delimiters documented
						and demoed so the package fits the “build query URLs on the
						front-end” list.
					</RoadmapItem>

					<RoadmapItem title="Open a PR on laravel-query-builder">
						Add a bullet under React / TypeScript in{" "}
						<a
							href={SPATIE_FRONT_END_DOCS_URL}
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							<code className="font-mono text-xs">
								docs/advanced-usage/front-end-implementation.md
							</code>
						</a>
						, e.g. Next.js + React:{" "}
						<code className="font-mono text-xs">
							@fabriciogferreira/use-url-query
						</code>
						.
					</RoadmapItem>
				</ul>
			</div>
		</section>
	)
}
