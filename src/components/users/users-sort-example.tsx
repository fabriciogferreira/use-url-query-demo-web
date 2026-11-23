"use client"

import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockLine,
	CodeBlockTitle,
} from "@/components/ui/code-block"
import { useHighlightedCode } from "@/hooks"

const EXAMPLE_CODE = `"use client"

import { useUrlQuery } from "@fabriciogferreira/use-url-query"
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useListUsers } from "@/hooks"

// Sorting stays on Spatie (URL) — skip TanStack rowSortingFeature.
const features = tableFeatures({})
type UsersTableFeatures = typeof features
const columnHelper = createColumnHelper<UsersTableFeatures, User>()

export function UsersSortTable() {
  const { sorts, cycleSort, queryString } = useUrlQuery({
    sorts: ["name"],
  })
  // Server sorts — feed queryString to your API client.
  const usersQuery = useListUsers({ queryString })
  const nameSort = sorts.find((sort) => sort.column === "name")

  const SortIcon = !nameSort?.include
    ? ArrowUpDownIcon
    : nameSort.direction === "-"
      ? ArrowDownIcon
      : ArrowUpIcon

  const columns = columnHelper.columns([
    columnHelper.accessor("name", {
      header: () => (
        <Button variant="ghost" onClick={() => cycleSort("name")}>
          Name
          <SortIcon data-icon="inline-end" />
        </Button>
      ),
    }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("status", { header: "Status" }),
  ])

  const table = useTable({
    features,
    data: usersQuery.data?.data ?? [],
    columns,
  })

  return (
    <div className="overflow-hidden rounded-md border">
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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// cycleSort("name") → off → sort=name → sort=-name → off
`

export function UsersSortExample() {
	const lines = useHighlightedCode(EXAMPLE_CODE, "tsx")

	return (
		<section className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<h2 className="text-sm font-medium">Example</h2>
				<p className="text-muted-foreground text-xs">
					Wire a shadcn / TanStack Table header to{" "}
					<code className="font-mono">cycleSort</code> instead of
					client{" "}
					<code className="font-mono">column.toggleSorting</code>. The
					API sorts via Spatie{" "}
					<code className="font-mono">sort</code> /{" "}
					<code className="font-mono">sort=-name</code>.
				</p>
			</div>
			<CodeBlock>
				<CodeBlockHeader>
					<CodeBlockTitle>users-sort-table.tsx</CodeBlockTitle>
					<CodeBlockActions>
						<CodeBlockCopyButton value={EXAMPLE_CODE} />
					</CodeBlockActions>
				</CodeBlockHeader>
				<CodeBlockContent lineNumbers wrap className="max-h-96">
					{lines.map((line, index) => (
						<CodeBlockLine key={index}>{line}</CodeBlockLine>
					))}
				</CodeBlockContent>
			</CodeBlock>
		</section>
	)
}
