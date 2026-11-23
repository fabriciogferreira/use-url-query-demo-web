"use client"

import { useMemo } from "react"
import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@/components/ui/code-block"
import { colorizeQueryString } from "./colorize-query-string"
import { useDocsQuery } from "./docs-query"

export function QueryStringDock() {
	const { queryString } = useDocsQuery()
	const queryParamsDisplay = queryString || "(empty)"
	const tokens = useMemo(
		() => colorizeQueryString(queryString),
		[queryString],
	)

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
						{/* Single grid child — CodeBlockContent lays out children as rows. */}
						<span className="min-w-0 whitespace-pre-wrap break-all">
							{tokens.map((token, index) => (
								<span
									key={`${token.kind}-${index}-${token.text}`}
									className={token.className}
									data-token-kind={token.kind}
								>
									{token.text}
								</span>
							))}
						</span>
					</CodeBlockContent>
				</CodeBlock>
			</div>
		</div>
	)
}
