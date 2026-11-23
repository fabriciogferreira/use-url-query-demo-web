import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@/components/ui/progress"
import {
	getSectionProgress,
	type RoadmapSectionId,
} from "./progress"

export type SectionProgressProps = {
	sectionId: RoadmapSectionId
}

export function SectionProgress(props: SectionProgressProps) {
	const { done, total, percent } = getSectionProgress(props.sectionId)

	return (
		<Progress value={percent} className="w-full max-w-md gap-2">
			<ProgressLabel>
				Checklist {done}/{total}
			</ProgressLabel>
			<ProgressValue />
		</Progress>
	)
}
