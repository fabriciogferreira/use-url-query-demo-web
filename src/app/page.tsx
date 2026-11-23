import { Suspense } from "react"
import { AppShell, DocsPage } from "@/components"

export default function HomePage() {
	return (
		<AppShell>
			<Suspense fallback={<p className="p-8 text-sm">Loading…</p>}>
				<DocsPage />
			</Suspense>
		</AppShell>
	)
}
