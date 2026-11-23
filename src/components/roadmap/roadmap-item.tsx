import type { ReactNode } from "react"

export type RoadmapItemProps = {
	title: string
	children: ReactNode
}

export function RoadmapItem(props: RoadmapItemProps) {
	return (
		<li className="flex flex-col gap-1">
			<p className="text-sm font-medium">{props.title}</p>
			<div className="text-muted-foreground text-sm leading-relaxed">
				{props.children}
			</div>
		</li>
	)
}
