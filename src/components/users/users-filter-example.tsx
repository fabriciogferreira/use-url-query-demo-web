"use client"

import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockLine,
	CodeBlockTitle,
} from "@/components/ui/code-block"
import { useHighlightedCode } from "@/hooks"

const EXAMPLE_CODE = `import { useUrlQuery } from "@fabriciogferreira/use-url-query"
import { parseAsString } from "nuqs"

const { filters, addFilter, removeFilter, queryString } = useUrlQuery({
  filters: {
    name: parseAsString,
  },
})

addFilter("name", "Alice")
removeFilter("name")
`

export function UsersFilterExample() {
	const lines = useHighlightedCode(EXAMPLE_CODE, "tsx")

	return (
		<section className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<h2 className="text-sm font-medium">Example</h2>
				<p className="text-muted-foreground text-xs">
					<code className="font-mono">addFilter</code> and{" "}
					<code className="font-mono">removeFilter</code> for Spatie{" "}
					<code className="font-mono">filter[name]</code>.
				</p>
			</div>
			<CodeBlock>
				<CodeBlockHeader>
					<CodeBlockTitle>use-url-query.tsx</CodeBlockTitle>
					<CodeBlockActions>
						<CodeBlockCopyButton value={EXAMPLE_CODE} />
					</CodeBlockActions>
				</CodeBlockHeader>
				<CodeBlockContent lineNumbers wrap className="max-h-72">
					{lines.map((line, index) => (
						<CodeBlockLine key={index}>{line}</CodeBlockLine>
					))}
				</CodeBlockContent>
			</CodeBlock>
		</section>
	)
}
