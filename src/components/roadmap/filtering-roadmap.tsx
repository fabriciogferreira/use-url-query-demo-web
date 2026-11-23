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

const SPATIE_FILTERING_URL =
	"https://spatie.be/docs/laravel-query-builder/v6/features/filtering"

const CURRENT_SURFACE = `addFilter("name", "Alice")  // equal only (=)
removeFilter("name")`

const FUTURE_OPERATORS = `// Planned API shape (not shipped)
addFilter("salary", 3000, ">")
addFilterGT("salary", 3000)
// Spatie dynamic operator in the value:
// filter[salary]=>3000`

export function FilteringRoadmap() {
	return (
		<section
			id="future-filtering"
			className="flex scroll-mt-24 flex-col gap-6"
		>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold tracking-tight">
						Filtering — roadmap
					</h2>
					<SectionProgress sectionId="filtering" />
				</div>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Aligned with Spatie’s{" "}
					<a
						href={SPATIE_FILTERING_URL}
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Filtering
					</a>{" "}
					docs. The hook should make it easy to build the same{" "}
					<code className="font-mono text-xs">filter[…]</code> query
					string the backend expects — without reimplementing Eloquent.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Available today</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Only equal filters and removal. Even if the TypeScript surface
					looks open, the supported behaviour is{" "}
					<code className="font-mono text-xs">addFilter</code> with{" "}
					<code className="font-mono text-xs">=</code> and{" "}
					<code className="font-mono text-xs">removeFilter</code>.
				</p>
				<CodeBlock>
					<CodeBlockHeader>
						<CodeBlockTitle>current</CodeBlockTitle>
						<CodeBlockActions>
							<CodeBlockCopyButton value={CURRENT_SURFACE} />
						</CodeBlockActions>
					</CodeBlockHeader>
					<CodeBlockContent wrap data-testid="roadmap-current">
						{CURRENT_SURFACE}
					</CodeBlockContent>
				</CodeBlock>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Planned</h3>
				<ul className="flex flex-col gap-4">
					<RoadmapItem title="Operator filters">
						<p>
							Beyond equal:{" "}
							<code className="font-mono text-xs">!=</code>,{" "}
							<code className="font-mono text-xs">&gt;</code>,{" "}
							<code className="font-mono text-xs">&lt;</code>,{" "}
							<code className="font-mono text-xs">&gt;=</code>,{" "}
							<code className="font-mono text-xs">&lt;=</code>, and
							Spatie’s dynamic form (
							<code className="font-mono text-xs">
								filter[salary]=&gt;3000
							</code>
							). Helpers such as{" "}
							<code className="font-mono text-xs">addFilterGT</code>{" "}
							may wrap the same API.
						</p>
						<CodeBlock className="mt-2">
							<CodeBlockHeader>
								<CodeBlockTitle>operators</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton value={FUTURE_OPERATORS} />
								</CodeBlockActions>
							</CodeBlockHeader>
							<CodeBlockContent wrap>{FUTURE_OPERATORS}</CodeBlockContent>
						</CodeBlock>
					</RoadmapItem>

					<RoadmapItem title="Multi-value filters">
						Comma-separated values the way Spatie documents them — e.g.{" "}
						<code className="font-mono text-xs">
							filter[name]=seb,freek
						</code>{" "}
						or{" "}
						<code className="font-mono text-xs">filter[id]=1,2,3</code> —
						including delimiter configuration later.
					</RoadmapItem>

					<RoadmapItem title="Partial, beginsWith, endsWith, exact">
						URL helpers and docs for the filter modes Spatie applies on the
						server (
						<code className="font-mono text-xs">LIKE %value%</code>,{" "}
						<code className="font-mono text-xs">value%</code>,{" "}
						<code className="font-mono text-xs">%value</code>, exact
						match). The query param shape stays{" "}
						<code className="font-mono text-xs">filter[key]=…</code>; the
						hook focuses on composing values safely.
					</RoadmapItem>

					<RoadmapItem title="Related keys &amp; BelongsTo-style filters">
						Dot-notation keys (
						<code className="font-mono text-xs">
							filter[posts.title]=…
						</code>
						) and relationship / belongsTo-style params so the client can
						mirror nested Spatie filters.
					</RoadmapItem>

					<RoadmapItem title="Scopes, trashed, callback &amp; custom">
						First-class support for naming filters that map to Spatie scope
						/ trashed / callback / custom filters (
						<code className="font-mono text-xs">
							filter[starts_before]=…
						</code>
						,{" "}
						<code className="font-mono text-xs">
							filter[trashed]=only
						</code>
						, etc.), including multi-arg scope values.
					</RoadmapItem>

					<RoadmapItem title="Aliases, ignore, defaults, nullable">
						Client-side aliases (short URL name → backend column), ignored
						values that skip updating the query string, default filter
						values when the URL omits a key, and nullable empty values (
						<code className="font-mono text-xs">filter[name]=</code>).
					</RoadmapItem>

					<RoadmapItem title="Filter groups (OR / AND)">
						Spatie{" "}
						<code className="font-mono text-xs">groupOr</code> /{" "}
						<code className="font-mono text-xs">groupAnd</code> — one URL
						param that fans out to several members, e.g.{" "}
						<code className="font-mono text-xs">filter[q]=John</code>.
					</RoadmapItem>

					<RoadmapItem title="Richer filter API">
						<code className="font-mono text-xs">setFilters</code>,{" "}
						<code className="font-mono text-xs">clearFilters</code>,
						disable-without-remove (keep a key for testing without applying
						it), and multi-value parsers from{" "}
						<code className="font-mono text-xs">nuqs</code>.
					</RoadmapItem>
				</ul>
			</div>
		</section>
	)
}
