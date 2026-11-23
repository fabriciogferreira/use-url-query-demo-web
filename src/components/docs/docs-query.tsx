"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useUrlQuery } from "@fabriciogferreira/use-url-query"
import { parseAsString } from "nuqs"

const docsFilters = {
	name: parseAsString,
} as const

type DocsQueryValue = ReturnType<typeof useUrlQuery<typeof docsFilters>>

const DocsQueryContext = createContext<DocsQueryValue | null>(null)

export type DocsQueryProviderProps = {
	children: ReactNode
}

export function DocsQueryProvider(props: DocsQueryProviderProps) {
	const value = useUrlQuery({
		filters: docsFilters,
		sorts: ["name"],
	})

	return (
		<DocsQueryContext.Provider value={value}>
			{props.children}
		</DocsQueryContext.Provider>
	)
}

export function useDocsQuery() {
	const value = useContext(DocsQueryContext)
	if (value === null) {
		throw new Error("useDocsQuery must be used within DocsQueryProvider")
	}
	return value
}
