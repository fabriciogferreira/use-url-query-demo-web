"use client"

import { useEffect, useState, type ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"

const TITLE_BY_HASH: Record<string, string> = {
	introduction: "Introduction",
	installation: "Installation",
	"compatibility-with-nuqs": "Compatibility with nuqs",
	"add-filter-remove-filter": "addFilter / removeFilter",
}

export type AppShellProps = {
	children: ReactNode
}

export function AppShell(props: AppShellProps) {
	const [title, setTitle] = useState("Introduction")

	useEffect(() => {
		const syncTitle = () => {
			const hash = window.location.hash.replace(/^#/, "")
			setTitle(TITLE_BY_HASH[hash] ?? "Introduction")
		}

		syncTitle()
		window.addEventListener("hashchange", syncTitle)
		return () => window.removeEventListener("hashchange", syncTitle)
	}, [])

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="max-h-svh overflow-hidden">
				<header className="bg-background z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-vertical:h-4 data-vertical:self-auto"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>{title}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="ms-auto">
						<ModeToggle />
					</div>
				</header>
				<div className="flex min-h-0 flex-1 flex-col">{props.children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
