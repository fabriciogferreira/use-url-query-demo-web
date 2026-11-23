"use client"

import { useEffect, useState } from "react"
import { ExternalLinkIcon } from "@/components/icons"
import { useDocsQuery } from "@/components/docs/docs-query"
import { Button } from "@/components/ui/button"
import {
	Field,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useListUsers } from "@/hooks"
import { UsersFilterExample } from "./users-filter-example"

const INPUT_DOCS_URL = "https://ui.shadcn.com/docs/components/base/input"

export function UsersFilter() {
	const { filters, addFilter, removeFilter, queryString } = useDocsQuery()
	const usersQuery = useListUsers({ queryString })
	const [nameDraft, setNameDraft] = useState(filters.name ?? "")
	const hasNameFilter = filters.name !== undefined && filters.name !== null

	useEffect(() => {
		setNameDraft(filters.name ?? "")
	}, [filters.name])

	return (
		<section
			id="add-filter-remove-filter"
			className="flex scroll-mt-24 flex-col gap-8"
		>
			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight">
						addFilter / removeFilter
					</h2>
					<p className="text-muted-foreground text-sm">
						Demo of{" "}
						<code className="font-mono text-xs">
							@fabriciogferreira/use-url-query
						</code>
						. The live{" "}
						<code className="font-mono text-xs">queryString</code> stays
						pinned at the bottom while you try filters.
					</p>
				</div>
				<Field>
					<FieldLabel
						htmlFor="filter-name"
						className="flex w-full items-center justify-between gap-2"
					>
						Name
						<a
							href={INPUT_DOCS_URL}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-normal underline-offset-4 hover:underline"
						>
							Input
							<ExternalLinkIcon className="size-3.5" aria-hidden />
						</a>
					</FieldLabel>
					<Input
						id="filter-name"
						aria-label="filter-name"
						placeholder="e.g. Alice"
						value={nameDraft}
						onChange={(event) => {
							setNameDraft(event.target.value)
						}}
					/>
					<FieldDescription>
						Edit the value, then call{" "}
						<code className="font-mono">addFilter</code> or{" "}
						<code className="font-mono">removeFilter</code>.
					</FieldDescription>
				</Field>
				<div className="flex flex-wrap gap-2">
					<Button
						type="button"
						disabled={nameDraft === ""}
						onClick={() => {
							addFilter("name", nameDraft)
						}}
					>
						addFilter
					</Button>
					<Button
						type="button"
						variant="outline"
						disabled={!hasNameFilter && nameDraft === ""}
						onClick={() => {
							setNameDraft("")
							removeFilter("name")
						}}
					>
						removeFilter
					</Button>
				</div>
			</section>

			<UsersFilterExample />

			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-sm font-medium">Results</h2>
					<p className="text-muted-foreground text-xs">
						<code className="font-mono">useListUsers</code> requests the API
						with the generated{" "}
						<code className="font-mono">queryString</code>.
					</p>
				</div>

				{usersQuery.isPending ? (
					<p className="text-muted-foreground text-sm">Loading…</p>
				) : null}

				{usersQuery.isError ? (
					<p className="text-destructive text-sm">Failed to load users.</p>
				) : null}

				{usersQuery.data ? (
					<ul className="flex flex-col gap-2" data-testid="users-list">
						{usersQuery.data.data.length === 0 ? (
							<li className="text-muted-foreground text-sm">
								No users match.
							</li>
						) : (
							usersQuery.data.data.map((user) => (
								<li
									key={user.id}
									className="border-input rounded-md border px-3 py-2 text-sm"
								>
									<span className="font-medium">{user.name}</span>
									<span className="text-muted-foreground">
										{" "}
										— {user.email}
									</span>
								</li>
							))
						)}
					</ul>
				) : null}
			</section>
		</section>
	)
}
