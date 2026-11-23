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

const INCLUDE_EXAMPLES = `// Planned URL shapes (Spatie)
// GET /users?include=posts
// GET /users?include=posts,permissions
// GET /users?include=posts.comments
// GET /users?include=postsCount,postsExists
// GET /users?include=postsViewsSum

addInclude("posts")
addInclude(["posts", "permissions"])
removeInclude("posts")
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
					param loads Eloquent relations (and counts / aggregates) on
					the API. Not part of the shipped demo surface yet — today
					only{" "}
					<code className="font-mono text-xs">addFilter</code> /{" "}
					<code className="font-mono text-xs">removeFilter</code> are
					documented as available.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Planned</h3>
				<ul className="flex flex-col gap-4">
					<RoadmapItem title="Basic & multi includes">
						<p>
							Compose{" "}
							<code className="font-mono text-xs">
								include=posts
							</code>{" "}
							and comma lists like{" "}
							<code className="font-mono text-xs">
								include=posts,permissions
							</code>
							. Helpers such as{" "}
							<code className="font-mono text-xs">addInclude</code>
							,{" "}
							<code className="font-mono text-xs">
								removeInclude
							</code>
							,{" "}
							<code className="font-mono text-xs">
								clearIncludes
							</code>
							, and{" "}
							<code className="font-mono text-xs">setIncludes</code>
							.
						</p>
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
