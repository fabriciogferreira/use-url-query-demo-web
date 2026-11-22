import { Suspense } from "react"
import { UsersFilter } from "@/components"

export default function HomePage() {
	return (
		<Suspense fallback={<p className="p-8 text-sm">Loading…</p>}>
			<UsersFilter />
		</Suspense>
	)
}
