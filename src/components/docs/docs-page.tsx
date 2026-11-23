"use client"

import { useRef } from "react"
import { Overview } from "@/components/overview"
import {
	DelimiterRoadmap,
	FieldsRoadmap,
	FilteringRoadmap,
	IncludingRoadmap,
	SortingRoadmap,
	SpatieListingRoadmap,
} from "@/components/roadmap"
import {
	UsersFields,
	UsersFilter,
	UsersInclude,
	UsersSort,
} from "@/components/users"
import { DocsQueryProvider } from "./docs-query"
import { QueryStringDock } from "./query-string-dock"
import { useDocsScrollSpy } from "./use-docs-scroll-spy"

export function DocsPage() {
	const scrollRootRef = useRef<HTMLDivElement>(null)
	useDocsScrollSpy(scrollRootRef)

	return (
		<DocsQueryProvider>
			<div className="flex min-h-0 flex-1 flex-col">
				<div
					ref={scrollRootRef}
					data-docs-scroll-root=""
					className="min-h-0 flex-1 overflow-y-auto"
				>
					<main className="flex w-full flex-col gap-10 p-8">
						<Overview />
						<UsersFilter />
						<UsersSort />
						<UsersFields />
						<UsersInclude />
						<FilteringRoadmap />
						<SortingRoadmap />
						<IncludingRoadmap />
						<FieldsRoadmap />
						<DelimiterRoadmap />
						<SpatieListingRoadmap />
					</main>
				</div>
				<QueryStringDock />
			</div>
		</DocsQueryProvider>
	)
}
