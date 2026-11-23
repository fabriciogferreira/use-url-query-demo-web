"use client"

import { useEffect, useState } from "react"
import { ChevronRightIcon } from "@/components/icons"
import { lockDocsScrollSpy } from "@/components/docs/use-docs-scroll-spy"
import { getSectionProgressByHash } from "@/components/roadmap/progress"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"

const data = {
	versions: ["0.1.3", "0.1.2", "0.1.1"],
	navMain: [
		{
			title: "Overview",
			items: [
				{
					title: "Introduction",
					hash: "introduction",
				},
				{
					title: "Installation",
					hash: "installation",
				},
				{
					title: "Compatibility with nuqs",
					hash: "compatibility-with-nuqs",
				},
			],
		},
		{
			title: "Filters",
			items: [
				{
					title: "addFilter / removeFilter",
					hash: "add-filter-remove-filter",
				},
			],
		},
		{
			title: "Sorting",
			items: [
				{
					title: "cycleSort",
					hash: "cycle-sort",
				},
			],
		},
		{
			title: "Fields",
			items: [
				{
					title: "addField / removeField",
					hash: "add-field-remove-field",
				},
			],
		},
		{
			title: "Future features",
			items: [
				{
					title: "Filtering",
					hash: "future-filtering",
				},
				{
					title: "Sorting",
					hash: "future-sorting",
				},
				{
					title: "Including relationships",
					hash: "future-including",
				},
				{
					title: "Selecting fields",
					hash: "future-fields",
				},
				{
					title: "Multi value delimiter",
					hash: "future-delimiter",
				},
				{
					title: "Spatie docs listing",
					hash: "future-spatie-listing",
				},
			],
		},
	],
}

function matchesQuery(text: string, query: string) {
	return text.toLowerCase().includes(query.toLowerCase())
}

function scrollToHash(hash: string) {
	const element = document.getElementById(hash)
	if (!element) {
		return
	}

	lockDocsScrollSpy()
	element.scrollIntoView({ behavior: "smooth", block: "start" })
	window.history.pushState(null, "", `#${hash}`)
	window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [hash, setHash] = useState("")
	const [query, setQuery] = useState("")
	const trimmedQuery = query.trim()
	const isSearching = trimmedQuery !== ""

	useEffect(() => {
		const syncHash = () => {
			setHash(window.location.hash.replace(/^#/, ""))
		}

		syncHash()
		window.addEventListener("hashchange", syncHash)
		return () => window.removeEventListener("hashchange", syncHash)
	}, [])

	useEffect(() => {
		const initialHash = window.location.hash.replace(/^#/, "")
		if (initialHash === "") {
			return
		}

		lockDocsScrollSpy()
		requestAnimationFrame(() => {
			document
				.getElementById(initialHash)
				?.scrollIntoView({ behavior: "smooth", block: "start" })
		})
	}, [])

	const navMain = isSearching
		? data.navMain
				.map((group) => {
					const groupMatches = matchesQuery(group.title, trimmedQuery)
					const items = group.items.filter(
						(item) =>
							groupMatches || matchesQuery(item.title, trimmedQuery),
					)

					if (items.length === 0) {
						return null
					}

					return {
						...group,
						items,
					}
				})
				.filter((group) => group !== null)
		: data.navMain

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher
					versions={data.versions}
					defaultVersion={data.versions[0]}
				/>
				<SearchForm value={query} onValueChange={setQuery} />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{navMain.length === 0 ? (
					<p className="text-muted-foreground px-4 py-2 text-sm">
						No results for “{trimmedQuery}”.
					</p>
				) : null}
				{navMain.map((item) => (
					<Collapsible
						key={item.title}
						title={item.title}
						defaultOpen
						{...(isSearching ? { open: true } : {})}
						className="group/collapsible"
					>
						<SidebarGroup>
							<SidebarGroupLabel
								className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
								render={<CollapsibleTrigger />}
							>
								{item.title}{" "}
								<ChevronRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{item.items.map((navItem) => {
											const isActive =
												hash === navItem.hash ||
												(hash === "" && navItem.hash === "introduction")
											const progress = getSectionProgressByHash(
												navItem.hash,
											)

											return (
												<SidebarMenuItem key={navItem.title}>
													<SidebarMenuButton
														isActive={isActive}
														render={
															<a
																href={`#${navItem.hash}`}
																onClick={(event) => {
																	event.preventDefault()
																	scrollToHash(navItem.hash)
																}}
															/>
														}
													>
														<span className="truncate">
															{navItem.title}
														</span>
														{progress ? (
															<span className="text-muted-foreground ms-auto tabular-nums">
																{progress.percent}%
															</span>
														) : null}
													</SidebarMenuButton>
												</SidebarMenuItem>
											)
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
