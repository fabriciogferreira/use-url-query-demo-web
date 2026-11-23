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

const SPATIE_INCLUDING_URL =
	"https://spatie.be/docs/laravel-query-builder/v6/features/including-relationships"

const CURRENT_SURFACE = `addInclude("posts")
// → include=posts

addInclude(["posts", "permissions"])
// → include=posts,permissions

removeInclude("posts")
clearIncludes()`

const INCLUDE_EXAMPLES = `// Planned URL shapes (Spatie)
// GET /users?include=posts.comments
// GET /users?include=postsCount,postsExists
// GET /users?include=postsViewsSum
`

export function IncludingRoadmap() {
	return (
		<section
			id="future-including"
			className="flex scroll-mt-24 flex-col gap-6"
		>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold tracking-tight">
						Including relationships — roadmap
					</h2>
					<SectionProgress sectionId="including" />
				</div>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Aligned with Spatie’s{" "}
					<a
						href={SPATIE_INCLUDING_URL}
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Including relationships
					</a>{" "}
					docs. The{" "}
					<code className="font-mono text-xs">include</code> query
					param loads Eloquent relations on the API.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Available today</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					<code className="font-mono text-xs">addInclude</code> /{" "}
					<code className="font-mono text-xs">removeInclude</code> /{" "}
					<code className="font-mono text-xs">clearIncludes</code> /{" "}
					<code className="font-mono text-xs">setIncludes</code> for{" "}
					<code className="font-mono text-xs">posts</code> and{" "}
					<code className="font-mono text-xs">permissions</code>,
					matching demo-api{" "}
					<code className="font-mono text-xs">allowedIncludes</code>.
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
					<RoadmapItem title="Nested relationships">
						Dot notation in the URL, e.g.{" "}
						<code className="font-mono text-xs">
							include=posts.comments
						</code>
						, matching Spatie’s nested{" "}
						<code className="font-mono text-xs">
							allowedIncludes
						</code>
						.
						<CodeBlock className="mt-2">
							<CodeBlockHeader>
								<CodeBlockTitle>include</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton value={INCLUDE_EXAMPLES} />
								</CodeBlockActions>
							</CodeBlockHeader>
							<CodeBlockContent wrap>
								{INCLUDE_EXAMPLES}
							</CodeBlockContent>
						</CodeBlock>
					</RoadmapItem>

					<RoadmapItem title="Count &amp; exists suffixes">
						Request{" "}
						<code className="font-mono text-xs">postsCount</code> /{" "}
						<code className="font-mono text-xs">postsExists</code>{" "}
						(and configurable suffixes such as{" "}
						<code className="font-mono text-xs">posts_count</code>),
						including count/exists-only includes without loading the
						full relation.
					</RoadmapItem>

					<RoadmapItem title="Aggregates (min, max, sum, avg)">
						Named includes like{" "}
						<code className="font-mono text-xs">
							postsViewsSum
						</code>{" "}
						that map to Spatie{" "}
						<code className="font-mono text-xs">
							AllowedInclude::sum/avg/min/max
						</code>{" "}
						— the hook only needs to put the right tokens in{" "}
						<code className="font-mono text-xs">include</code>.
					</RoadmapItem>

					<RoadmapItem title="Aliases, custom &amp; callback includes">
						Friendly URL names (
						<code className="font-mono text-xs">
							include=profile
						</code>{" "}
						→{" "}
						<code className="font-mono text-xs">userProfile</code>
						), plus custom / callback include names the API
						registers with Spatie.
					</RoadmapItem>

					<RoadmapItem title="Allowed includes &amp; casing">
						Only configured include names enter{" "}
						<code className="font-mono text-xs">queryString</code>.
						Preserve request casing (
						<code className="font-mono text-xs">blog-posts</code>{" "}
						vs{" "}
						<code className="font-mono text-xs">blogPosts</code>) so
						it matches the relation name on the server.
					</RoadmapItem>

					<RoadmapItem title="Enable / disable without remove">
						Keep an include in client state but omit it from the
						query string while testing — same pattern as filters and
						sorts.
					</RoadmapItem>
				</ul>
			</div>
		</section>
	)
}
