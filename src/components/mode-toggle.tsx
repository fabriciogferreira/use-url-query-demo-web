"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const emptySubscribe = () => () => {}

export function ModeToggle() {
	const { theme, setTheme } = useTheme()
	const isMounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	)

	if (!isMounted) {
		return (
			<div
				aria-hidden
				className="border-input h-7 w-[4.75rem] rounded-md border"
			/>
		)
	}

	const activeTheme =
		theme === "light" || theme === "dark" || theme === "system"
			? theme
			: "dark"

	return (
		<ToggleGroup
			variant="outline"
			spacing={0}
			size="sm"
			value={[activeTheme]}
			onValueChange={(value) => {
				const nextTheme = value[0]
				if (
					nextTheme === "light" ||
					nextTheme === "dark" ||
					nextTheme === "system"
				) {
					setTheme(nextTheme)
				}
			}}
			aria-label="Theme"
		>
			<ToggleGroupItem value="light" aria-label="Light">
				<SunIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="dark" aria-label="Dark">
				<MoonIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="system" aria-label="System">
				<MonitorIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
