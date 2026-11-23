"use client"

import { useDocsQuery } from "@/components/docs/docs-query"
import { Button } from "@/components/ui/button"
import { useListUsers } from "@/hooks"
import type { User } from "@/schemas"

import { UsersFieldsExample } from "./users-fields-example"
import {
	USERS_RESOURCE,
	usersAllowedFields,
	type UsersAllowedField,
} from "./users-fields-features"

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
	if (user.email !== undefined) {
		parts.push(user.email)
	}
	if (user.status !== undefined) {
		parts.push(user.status)
	}
	return parts.length > 0 ? parts.join(" — ") : "(empty row)"
}

export function UsersFields() {
	const { fields, addField, removeField, queryString } = useDocsQuery()
	const usersQuery = useListUsers({ queryString })
	const selected = fields[USERS_RESOURCE] ?? []

	const isSelected = (field: UsersAllowedField) => selected.includes(field)

	const toggleField = (field: UsersAllowedField) => {
		if (isSelected(field)) {
			removeField(USERS_RESOURCE, field)
			return
		}
		addField(USERS_RESOURCE, field)
	}

	return (
		<section
			id="add-field-remove-field"
			className="flex scroll-mt-24 flex-col gap-8"
		>
			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-xl font-semibold tracking-tight">
						addField / removeField
					</h2>
					<p className="text-muted-foreground text-sm">
						Allowed fields for{" "}
						<code className="font-mono text-xs">users</code> match
						the API{" "}
						<code className="font-mono text-xs">allowedFields</code>
						:{" "}
						<code className="font-mono text-xs">id</code>,{" "}
						<code className="font-mono text-xs">name</code>. Toggle
						to merge into{" "}
						<code className="font-mono text-xs">
							fields[users]=…
						</code>
						.
					</p>
					<p className="text-muted-foreground text-sm">
						Selected:{" "}
						<code
							className="font-mono text-xs"
							data-testid="fields-state"
						>
							{selected.length > 0
								? selected.join(",")
								: "(all columns)"}
						</code>
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{usersAllowedFields.map((field) => (
						<Button
							key={field}
							type="button"
							variant={isSelected(field) ? "default" : "outline"}
							aria-pressed={isSelected(field)}
							aria-label={`toggle-field-${field}`}
							onClick={() => {
								toggleField(field)
							}}
						>
							{isSelected(field) ? "removeField" : "addField"}{" "}
							{field}
						</Button>
					))}
					<Button
						type="button"
						variant="outline"
						disabled={selected.length === 0}
						aria-label="clear-fields-users"
						onClick={() => {
							removeField(USERS_RESOURCE)
						}}
					>
						removeField users
					</Button>
				</div>
			</section>

			<UsersFieldsExample />

			<section className="flex flex-col gap-3">
				<div className="flex flex-col gap-1">
					<h2 className="text-sm font-medium">Results</h2>
					<p className="text-muted-foreground text-xs">
						Response keys follow the active{" "}
						<code className="font-mono">fields[users]</code>{" "}
						selection (or every column when none is set).
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
						data-testid="fields-users-list"
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
