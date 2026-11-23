"use client"

import { useEffect, type RefObject } from "react"
import { DOC_SECTION_HASHES } from "./sections"

const SCROLL_SPY_LOCK_EVENT = "docs-scroll-spy-lock"
const ACTIVE_OFFSET_PX = 112

let scrollSpyLockedUntil = 0

export function lockDocsScrollSpy(durationMs = 900) {
	scrollSpyLockedUntil = Date.now() + durationMs
	window.dispatchEvent(new Event(SCROLL_SPY_LOCK_EVENT))
}

function isScrollSpyLocked() {
	return Date.now() < scrollSpyLockedUntil
}

function getActiveHash(scrollRoot: HTMLElement) {
	const rootTop = scrollRoot.getBoundingClientRect().top
	let activeHash = DOC_SECTION_HASHES[0]

	for (const hash of DOC_SECTION_HASHES) {
		const element = document.getElementById(hash)
		if (!element) {
			continue
		}

		const top = element.getBoundingClientRect().top - rootTop
		if (top <= ACTIVE_OFFSET_PX) {
			activeHash = hash
		}
	}

	return activeHash
}

function setHashFromScroll(hash: string) {
	const nextHash = `#${hash}`
	if (window.location.hash === nextHash) {
		return
	}

	window.history.replaceState(null, "", nextHash)
	window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export function useDocsScrollSpy(
	scrollRootRef: RefObject<HTMLElement | null>,
) {
	useEffect(() => {
		const scrollRoot = scrollRootRef.current
		if (!scrollRoot) {
			return
		}

		const syncFromScroll = () => {
			if (isScrollSpyLocked()) {
				return
			}

			setHashFromScroll(getActiveHash(scrollRoot))
		}

		const onLock = () => {
			window.setTimeout(() => {
				syncFromScroll()
			}, Math.max(0, scrollSpyLockedUntil - Date.now() + 16))
		}

		scrollRoot.addEventListener("scroll", syncFromScroll, { passive: true })
		window.addEventListener(SCROLL_SPY_LOCK_EVENT, onLock)
		syncFromScroll()

		return () => {
			scrollRoot.removeEventListener("scroll", syncFromScroll)
			window.removeEventListener(SCROLL_SPY_LOCK_EVENT, onLock)
		}
	}, [scrollRootRef])
}
