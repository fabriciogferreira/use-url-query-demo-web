"use client"

import { useDocsQuery } from "@/components/docs/docs-query"
import { useListUsers } from "@/hooks"

import { UsersSortExample } from "./users-sort-example"
import { UsersSortTable } from "./users-sort-table"

function sortStateLabel(include: boolean, direction: string) {
	if (!include) {
		return "off"
	}

	return direction === "-" ? "desc" : "asc"
}

export function UsersSort() {
	const { sorts, cycleSort, queryString } = useDocsQuery()
	const usersQuery = useListUsers({ queryString })
	const nameSort = sorts.find((sort) => sort.column === "name")
	const state = sortStateLabel(
		nameSort?.include ?? false,
		nameSort?.direction ?? "",
	)

	return (
		<section
			id="cycle-sort"
			className="flex scroll-mt-24 flex-col gap-8"
		>
			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight">
						cycleSort
					</h2>
					<p className="text-muted-foreground text-sm">
						Allowed sort catalog is just{" "}
						<code className="font-mono text-xs">name</code>. Click
						the Name column header to cycle off → ascending →
						descending → off (activated sorts move to the last
						priority slot).
					</p>
					<p className="text-muted-foreground text-sm">
						State:{" "}
						<code
							className="font-mono text-xs"
							data-testid="sort-state"
						>
							{state}
						</code>
					</p>
				</div>

				<UsersSortTable
					users={usersQuery.data?.data ?? []}
					cycleSort={cycleSort}
					nameSort={nameSort}
					isPending={usersQuery.isPending}
					isError={usersQuery.isError}
				/>
			</section>

			<UsersSortExample />
		</section>
	)
}
