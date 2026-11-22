"use client"

import { useUrlQuery } from "@fabriciogferreira/use-url-query"
import { parseAsString } from "nuqs"
import { useListUsers } from "@/hooks"

export function UsersFilter() {
	const { filters, addFilterDebounced, removeFilter, queryString } =
		useUrlQuery({
			filters: {
				name: parseAsString,
			},
		})

	const usersQuery = useListUsers({ queryString })

	return (
		<main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-2xl font-semibold tracking-tight">Users</h1>
				<p className="text-sm text-zinc-600 dark:text-zinc-400">
					Filter by exact name (`filter[name]=…`) via{" "}
					<code>useUrlQuery</code>.
				</p>
			</header>

			<label className="flex flex-col gap-1 text-sm">
				<span className="font-medium">Name</span>
				<input
					aria-label="filter-name"
					className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
					value={filters.name ?? ""}
					onChange={(event) => {
						const value = event.target.value
						if (value === "") {
							removeFilter("name", null)
							return
						}
						addFilterDebounced("name", value)
					}}
				/>
			</label>

			<p
				className="font-mono text-xs text-zinc-500"
				data-testid="query-string"
			>
				{queryString || "(no filter)"}
			</p>

			{usersQuery.isPending ? (
				<p className="text-sm text-zinc-500">Loading…</p>
			) : null}

			{usersQuery.isError ? (
				<p className="text-sm text-red-600">Failed to load users.</p>
			) : null}

			{usersQuery.data ? (
				<ul className="flex flex-col gap-2" data-testid="users-list">
					{usersQuery.data.data.length === 0 ? (
						<li className="text-sm text-zinc-500">No users match.</li>
					) : (
						usersQuery.data.data.map((user) => (
							<li
								key={user.id}
								className="rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
							>
								<span className="font-medium">{user.name}</span>
								<span className="text-zinc-500"> — {user.email}</span>
							</li>
						))
					)}
				</ul>
			) : null}
		</main>
	)
}
