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

const SPATIE_FIELDS_URL =
	"https://spatie.be/docs/laravel-query-builder/v6/features/selecting-fields"

const CURRENT_SURFACE = `addField("users", ["id", "name"])
// → fields[users]=id,name

removeField("users", "name")
removeField("users")`

const FIELDS_EXAMPLES = `// Planned
addField("authors", ["id", "name"]) // with include=author
fieldParamAs: "select"
`

export function FieldsRoadmap() {
	return (
		<section id="future-fields" className="flex scroll-mt-24 flex-col gap-6">
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold tracking-tight">
						Selecting fields — roadmap
					</h2>
					<SectionProgress sectionId="fields" />
				</div>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Aligned with Spatie’s{" "}
					<a
						href={SPATIE_FIELDS_URL}
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Selecting fields
					</a>{" "}
					docs. The{" "}
					<code className="font-mono text-xs">fields[table]=…</code>{" "}
					query param narrows the SQL{" "}
					<code className="font-mono text-xs">SELECT</code>.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Available today</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">
					<code className="font-mono text-xs">addField</code> /{" "}
					<code className="font-mono text-xs">removeField</code> for
					the users table (
					<code className="font-mono text-xs">id</code>,{" "}
					<code className="font-mono text-xs">name</code>), matching
					demo-api{" "}
					<code className="font-mono text-xs">allowedFields</code>.
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
					<RoadmapItem title="Fields for included relations">
						Select columns on included models, e.g.{" "}
						<code className="font-mono text-xs">
							fields[authors]=id,name
						</code>{" "}
						together with{" "}
						<code className="font-mono text-xs">include=author</code>
						. Follow Spatie’s table-name convention (snake plural of
						the relation by default) and keep required FK / relation
						columns in the selection so Eloquent can still resolve
						relationships.
					</RoadmapItem>

					<RoadmapItem title="Param naming &amp; delimiters">
						Optional rename of the{" "}
						<code className="font-mono text-xs">fields</code> param
						and configurable multi-value delimiters (same advanced
						options as filters / includes / sorts).
						<CodeBlock className="mt-2">
							<CodeBlockHeader>
								<CodeBlockTitle>fields</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton value={FIELDS_EXAMPLES} />
								</CodeBlockActions>
							</CodeBlockHeader>
							<CodeBlockContent wrap>
								{FIELDS_EXAMPLES}
							</CodeBlockContent>
						</CodeBlock>
					</RoadmapItem>

					<RoadmapItem title="Enable / disable without remove">
						Keep a field selection in client state but omit it from
						the query string while testing.
					</RoadmapItem>
				</ul>
			</div>
		</section>
	)
}
