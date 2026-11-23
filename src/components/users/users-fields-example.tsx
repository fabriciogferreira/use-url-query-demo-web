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

const { fields, addField, removeField, queryString } = useUrlQuery()

addField("users", ["id", "name"])
// → ?fields[users]=id,name

removeField("users", "name")
// → ?fields[users]=id

removeField("users")
// clears fields[users]
`

export function UsersFieldsExample() {
	const lines = useHighlightedCode(EXAMPLE_CODE, "tsx")

	return (
		<section className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<h2 className="text-sm font-medium">Example</h2>
				<p className="text-muted-foreground text-xs">
					<code className="font-mono">addField</code> /{" "}
					<code className="font-mono">removeField</code> build Spatie{" "}
					<code className="font-mono">fields[users]=id,name</code>.
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
