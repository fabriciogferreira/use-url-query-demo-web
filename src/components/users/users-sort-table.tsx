"use client"

import type { Sort } from "@fabriciogferreira/use-url-query"
import { useTable } from "@tanstack/react-table"

import { Skeleton } from "@/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { User } from "@/schemas"

import { createUsersSortColumns } from "./users-sort-columns"
import { usersSortTableFeatures } from "./users-sort-table-features"

export type UsersSortTableProps = {
	users: User[]
	cycleSort: (column: string) => void
	nameSort: Sort | undefined
	isPending: boolean
	isError: boolean
}

export function UsersSortTable(props: UsersSortTableProps) {
	const columns = createUsersSortColumns({
		cycleSort: props.cycleSort,
		nameSort: props.nameSort,
	})

	const table = useTable({
		features: usersSortTableFeatures,
		data: props.users,
		columns,
	})

	if (props.isPending) {
		return (
			<div className="flex flex-col gap-2" aria-busy="true">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
		)
	}

	if (props.isError) {
		return (
			<p className="text-destructive text-sm">Failed to load users.</p>
		)
	}

	return (
		<div
			className="overflow-hidden rounded-md border"
			data-testid="sorted-users-list"
		>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder ? null : (
										<table.FlexRender header={header} />
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getAllCells().map((cell) => (
									<TableCell key={cell.id}>
										<table.FlexRender cell={cell} />
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No users match.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
