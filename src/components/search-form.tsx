"use client"

import { Label } from "@/components/ui/label"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarInput,
} from "@/components/ui/sidebar"
import { SearchIcon } from "@/components/icons"

export type SearchFormProps = Omit<React.ComponentProps<"form">, "onChange"> & {
	value: string
	onValueChange: (value: string) => void
}

export function SearchForm(props: SearchFormProps) {
	const { value, onValueChange, ...formProps } = props

	return (
		<form
			{...formProps}
			onSubmit={(event) => {
				event.preventDefault()
			}}
		>
			<SidebarGroup className="py-0">
				<SidebarGroupContent className="relative">
					<Label htmlFor="search" className="sr-only">
						Search
					</Label>
					<SidebarInput
						id="search"
						placeholder="Search the docs..."
						className="pl-8"
						value={value}
						onChange={(event) => {
							onValueChange(event.target.value)
						}}
					/>
					<SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
				</SidebarGroupContent>
			</SidebarGroup>
		</form>
	)
}
