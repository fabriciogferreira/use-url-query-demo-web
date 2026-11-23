"use client"

import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@/components/ui/code-block"
import { useDocsQuery } from "./docs-query"

export function QueryStringDock() {
	const { queryString } = useDocsQuery()
	const queryParamsDisplay = queryString || "(empty)"

	return (
		<div className="bg-background/95 supports-backdrop-filter:bg-background/80 shrink-0 border-t backdrop-blur">
			<div className="px-4 py-3">
				<CodeBlock>
					<CodeBlockHeader>
						<CodeBlockTitle>queryString</CodeBlockTitle>
						<CodeBlockActions>
							<CodeBlockCopyButton value={queryParamsDisplay} />
						</CodeBlockActions>
					</CodeBlockHeader>
					<CodeBlockContent
						data-testid="query-string"
						wrap
						className="max-h-24 overflow-y-auto"
					>
						{queryParamsDisplay}
					</CodeBlockContent>
				</CodeBlock>
			</div>
		</div>
	)
}
