import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@/components/ui/code-block"
import { RoadmapItem } from "./roadmap-item"

const SPATIE_DELIMITER_URL =
	"https://spatie.be/docs/laravel-query-builder/v6/advanced-usage/multi-value-delimiter"

const DELIMITER_EXAMPLES = `// Planned config shape (matches Spatie)
useUrlQuery({
  delimiter: "|",                    // filters, includes, sorts, fields…
  filterValueSplittingEnabled: true, // or false to keep commas in filters
  filters: {
    voltage: parseAsString, // + per-filter delimiter: "|"
    name: parseAsString,    // default ","
  },
})

// GET …?filter[voltage]=12,4V|4,7V|2,1V&filter[name]=John,Jane
`

export function DelimiterRoadmap() {
	return (
		<section
			id="future-delimiter"
			className="flex scroll-mt-24 flex-col gap-6"
		>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold tracking-tight">
					Multi value delimiter — roadmap
				</h2>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Aligned with Spatie’s{" "}
					<a
						href={SPATIE_DELIMITER_URL}
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Multi value delimiter
					</a>{" "}
					docs. When a value itself contains commas, the split
					character for multi-value params must be configurable. Not
					part of the shipped demo surface yet — today only{" "}
					<code className="font-mono text-xs">addFilter</code> /{" "}
					<code className="font-mono text-xs">removeFilter</code> are
					documented as available.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-sm font-medium">Planned</h3>
				<ul className="flex flex-col gap-4">
					<RoadmapItem title="Global delimiter">
						<p>
							Hook option (default{" "}
							<code className="font-mono text-xs">,</code>) that
							applies when joining / splitting filters, includes,
							sorts, fields, and appends — e.g.{" "}
							<code className="font-mono text-xs">
								filter[voltage]=12,4V|4,7V|2,1V
							</code>{" "}
							with{" "}
							<code className="font-mono text-xs">
								delimiter: &apos;|&apos;
							</code>
							. Empty string disables splitting entirely.
						</p>
						<CodeBlock className="mt-2">
							<CodeBlockHeader>
								<CodeBlockTitle>delimiter</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton
										value={DELIMITER_EXAMPLES}
									/>
								</CodeBlockActions>
							</CodeBlockHeader>
							<CodeBlockContent wrap>
								{DELIMITER_EXAMPLES}
							</CodeBlockContent>
						</CodeBlock>
					</RoadmapItem>

					<RoadmapItem title="Disable filter value splitting">
						Option equivalent to Spatie’s{" "}
						<code className="font-mono text-xs">
							filter_value_splitting_enabled: false
						</code>{" "}
						— filter values stay intact while includes, sorts,
						fields, and appends still use the global delimiter.
					</RoadmapItem>

					<RoadmapItem title="Per-filter delimiter">
						Override the delimiter on a single filter (Spatie{" "}
						<code className="font-mono text-xs">
							-&gt;delimiter(&apos;|&apos;)
						</code>
						), or{" "}
						<code className="font-mono text-xs">
							delimiter(&apos;&apos;)
						</code>{" "}
						to never split that filter’s value.
					</RoadmapItem>

					<RoadmapItem title="Serialize &amp; parse round-trip">
						When adding multi-value filters / includes / sorts /
						fields, join with the configured delimiter so{" "}
						<code className="font-mono text-xs">queryString</code>{" "}
						matches what the Laravel config expects — and parse the
						URL back the same way.
					</RoadmapItem>
				</ul>
			</div>
		</section>
	)
}
