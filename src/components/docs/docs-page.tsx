"use client"

import { Overview } from "@/components/overview"
import { UsersFilter } from "@/components/users"
import { DocsQueryProvider } from "./docs-query"
import { QueryStringDock } from "./query-string-dock"

export function DocsPage() {
	return (
		<DocsQueryProvider>
			<div className="flex min-h-0 flex-1 flex-col">
				<div className="min-h-0 flex-1 overflow-y-auto">
					<main className="flex w-full flex-col gap-10 p-8">
						<Overview />
						<UsersFilter />
					</main>
				</div>
				<QueryStringDock />
			</div>
		</DocsQueryProvider>
	)
}
