"use client"

import type { Sort } from "@fabriciogferreira/use-url-query"
import { createColumnHelper } from "@tanstack/react-table"

import {
	ArrowDownIcon,
	ArrowUpDownIcon,
	ArrowUpIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import type { User } from "@/schemas"

import {
	usersSortTableFeatures,
	type UsersSortTableFeatures,
} from "./users-sort-table-features"

const columnHelper = createColumnHelper<UsersSortTableFeatures, User>()

export type CreateUsersSortColumnsArgs = {
	cycleSort: (column: string) => void
	nameSort: Sort | undefined
}

export function createUsersSortColumns(args: CreateUsersSortColumnsArgs) {
	const SortIcon = !args.nameSort?.include
		? ArrowUpDownIcon
		: args.nameSort.direction === "-"
			? ArrowDownIcon
			: ArrowUpIcon

	return columnHelper.columns([
		columnHelper.accessor("name", {
			header: () => (
				<Button
					type="button"
					variant="ghost"
					aria-label="cycle-sort-name"
					className="-ml-2"
					onClick={() => {
						args.cycleSort("name")
					}}
				>
					Name
					<SortIcon data-icon="inline-end" aria-hidden />
				</Button>
			),
		}),
		columnHelper.accessor("email", {
			header: "Email",
		}),
		columnHelper.accessor("status", {
			header: "Status",
			cell: ({ getValue }) => {
				const status = getValue()
				return status ? (
					<span className="capitalize">{status}</span>
				) : null
			},
		}),
	])
}

export { usersSortTableFeatures }
