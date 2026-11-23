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

const INSTALL_CODE = `npm install @fabriciogferreira/use-url-query`

const NUQS_COMPAT_CODE = `import { useUrlQuery } from "@fabriciogferreira/use-url-query"
import { parseAsInteger, parseAsString } from "nuqs"

const { filters, addFilter, queryString } = useUrlQuery({
  filters: {
    name: parseAsString,
    age: parseAsInteger,
  },
})

// Spatie-style query string for your API:
// filter[name]=Alice&filter[age]=30
`

export function Overview() {
	const installLines = useHighlightedCode(INSTALL_CODE, "bash")
	const nuqsLines = useHighlightedCode(NUQS_COMPAT_CODE, "tsx")

	return (
		<>
			<section id="introduction" className="flex scroll-mt-24 flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold tracking-tight">
						Introduction
					</h1>
					<p className="text-muted-foreground text-sm leading-relaxed">
						<code className="font-mono text-xs">
							@fabriciogferreira/use-url-query
						</code>{" "}
						is a React hook for Next.js that keeps URL search params in sync
						with{" "}
						<a
							href="https://spatie.be/docs/laravel-query-builder"
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							Spatie Laravel Query Builder
						</a>{" "}
						conventions —{" "}
						<code className="font-mono text-xs">filter[…]</code>,{" "}
						<code className="font-mono text-xs">sort</code>,{" "}
						<code className="font-mono text-xs">include</code>, and more.
					</p>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Call helpers like{" "}
						<code className="font-mono text-xs">addFilter</code> /{" "}
						<code className="font-mono text-xs">removeFilter</code>, then pass
						the generated{" "}
						<code className="font-mono text-xs">queryString</code> straight to
						your API client.
					</p>
				</div>
			</section>

			<section id="installation" className="flex scroll-mt-24 flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight">
						Installation
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Install the package from npm. It depends on{" "}
						<code className="font-mono text-xs">nuqs</code> for typed filter
						parsers and works with the App Router (
						<code className="font-mono text-xs">next/navigation</code>).
					</p>
				</div>
				<CodeBlock>
					<CodeBlockHeader>
						<CodeBlockTitle>Terminal</CodeBlockTitle>
						<CodeBlockActions>
							<CodeBlockCopyButton value={INSTALL_CODE} />
						</CodeBlockActions>
					</CodeBlockHeader>
					<CodeBlockContent lineNumbers wrap>
						{installLines.map((line, index) => (
							<CodeBlockLine key={index}>{line}</CodeBlockLine>
						))}
					</CodeBlockContent>
				</CodeBlock>
			</section>

			<section
				id="compatibility-with-nuqs"
				className="flex scroll-mt-24 flex-col gap-3"
			>
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight">
						Compatibility with nuqs
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Filter schemas reuse{" "}
						<a
							href="https://nuqs.dev/docs/parsers"
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							nuqs parsers
						</a>{" "}
						(<code className="font-mono text-xs">parseAsString</code>,{" "}
						<code className="font-mono text-xs">parseAsInteger</code>, …). The
						hook calls each parser’s{" "}
						<code className="font-mono text-xs">parse</code> /{" "}
						<code className="font-mono text-xs">serialize</code> when reading
						the URL and building Spatie query params.
					</p>
					<p className="text-muted-foreground text-sm leading-relaxed">
						You do not need{" "}
						<code className="font-mono text-xs">NuqsAdapter</code> for{" "}
						<code className="font-mono text-xs">useUrlQuery</code> itself — URL
						updates go through Next.js{" "}
						<code className="font-mono text-xs">useSearchParams</code> /{" "}
						<code className="font-mono text-xs">useRouter</code>. Keep using
						nuqs elsewhere in the app if you want.
					</p>
				</div>
				<CodeBlock>
					<CodeBlockHeader>
						<CodeBlockTitle>filters with nuqs parsers</CodeBlockTitle>
						<CodeBlockActions>
							<CodeBlockCopyButton value={NUQS_COMPAT_CODE} />
						</CodeBlockActions>
					</CodeBlockHeader>
					<CodeBlockContent lineNumbers wrap className="max-h-72">
						{nuqsLines.map((line, index) => (
							<CodeBlockLine key={index}>{line}</CodeBlockLine>
						))}
					</CodeBlockContent>
				</CodeBlock>
			</section>
		</>
	)
}
