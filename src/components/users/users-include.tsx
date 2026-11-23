"use client"

import { useDocsQuery } from "@/components/docs/docs-query"
import { Button } from "@/components/ui/button"
import { useListUsers } from "@/hooks"
import type { User } from "@/schemas"

import { UsersIncludeExample } from "./users-include-example"
import {
	usersAllowedIncludes,
	type UsersAllowedInclude,
} from "./users-include-features"

function userRowKey(user: User, index: number) {
	return user.id ?? user.name ?? `user-${index}`
}

function formatUserRow(user: User) {
	const parts: string[] = []
	if (user.id !== undefined) {
		parts.push(`id=${user.id}`)
	}
	if (user.name !== undefined) {
		parts.push(user.name)
	}
	if (user.posts !== undefined) {
		parts.push(`posts=${user.posts.length}`)
	}
	if (user.permissions !== undefined) {
		parts.push(`permissions=${user.permissions.length}`)
	}
	return parts.length > 0 ? parts.join(" — ") : "(empty row)"
}

export function UsersInclude() {
	const { includes, addInclude, removeInclude, clearIncludes, queryString } =
		useDocsQuery()
	const usersQuery = useListUsers({ queryString })

	const isSelected = (include: UsersAllowedInclude) =>
		includes.includes(include)

	const toggleInclude = (include: UsersAllowedInclude) => {
		if (isSelected(include)) {
			removeInclude(include)
			return
		}
		addInclude(include)
	}

	return (
		<section
			id="add-include-remove-include"
			className="flex scroll-mt-24 flex-col gap-8"
		>
			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight">
						addInclude / removeInclude
					</h2>
					<p className="text-muted-foreground text-sm">
						Allowed includes match the API{" "}
						<code className="font-mono text-xs">allowedIncludes</code>
						:{" "}
						<code className="font-mono text-xs">posts</code>,{" "}
						<code className="font-mono text-xs">permissions</code>.
						Toggle to merge into{" "}
						<code className="font-mono text-xs">include=…</code>.
					</p>
					<p className="text-muted-foreground text-sm">
						Selected:{" "}
						<code
							className="font-mono text-xs"
							data-testid="includes-state"
						>
							{includes.length > 0
								? includes.join(",")
								: "(none)"}
						</code>
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{usersAllowedIncludes.map((include) => (
						<Button
							key={include}
							type="button"
							variant={isSelected(include) ? "default" : "outline"}
							aria-pressed={isSelected(include)}
							aria-label={`toggle-include-${include}`}
							onClick={() => {
								toggleInclude(include)
							}}
						>
							{isSelected(include) ? "removeInclude" : "addInclude"}{" "}
							{include}
						</Button>
					))}
					<Button
						type="button"
						variant="outline"
						disabled={includes.length === 0}
						aria-label="clear-includes"
						onClick={() => {
							clearIncludes()
						}}
					>
						clearIncludes
					</Button>
				</div>
			</section>

			<UsersIncludeExample />

			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-sm font-medium">Results</h2>
					<p className="text-muted-foreground text-xs">
						Relations appear on each user only when listed in{" "}
						<code className="font-mono">include</code>.
					</p>
				</div>

				{usersQuery.isPending ? (
					<p className="text-muted-foreground text-sm">Loading…</p>
				) : null}

				{usersQuery.isError ? (
					<p className="text-destructive text-sm">
						Failed to load users.
					</p>
				) : null}

				{usersQuery.data ? (
					<ul
						className="flex flex-col gap-2"
						data-testid="include-users-list"
					>
						{usersQuery.data.data.length === 0 ? (
							<li className="text-muted-foreground text-sm">
								No users match.
							</li>
						) : (
							usersQuery.data.data.map((user, index) => (
								<li
									key={userRowKey(user, index)}
									className="border-input rounded-md border px-3 py-2 font-mono text-sm"
								>
									{formatUserRow(user)}
								</li>
							))
						)}
					</ul>
				) : null}
			</section>
		</section>
	)
}
