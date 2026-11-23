export type QueryStringTokenKind = "empty" | "qmark" | "amp" | "param"

export type QueryStringToken = {
	kind: QueryStringTokenKind
	text: string
	className: string
}

const EMPTY_CLASS = "text-muted-foreground"

/** Sequential palette — each token in the string gets the next color. */
const TOKEN_CLASSES = [
	"text-sky-600 dark:text-sky-400",
	"text-emerald-700 dark:text-emerald-400",
	"text-amber-600 dark:text-amber-400",
	"text-rose-700 dark:text-rose-400",
	"text-teal-700 dark:text-teal-400",
	"text-orange-700 dark:text-orange-400",
	"text-cyan-700 dark:text-cyan-400",
	"text-lime-700 dark:text-lime-400",
] as const

function tokenClassName(index: number): string {
	return TOKEN_CLASSES[index % TOKEN_CLASSES.length]
}

/**
 * Split a query string into tokens (`?`, `key=value`, `&`) and color each
 * segment by its position in the sequence — not by param key name.
 */
export function colorizeQueryString(queryString: string): QueryStringToken[] {
	if (!queryString) {
		return [
			{
				kind: "empty",
				text: "(empty)",
				className: EMPTY_CLASS,
			},
		]
	}

	const tokens: QueryStringToken[] = []
	let rest = queryString

	if (rest.startsWith("?")) {
		tokens.push({
			kind: "qmark",
			text: "?",
			className: tokenClassName(tokens.length),
		})
		rest = rest.slice(1)
	}

	if (!rest) {
		return tokens
	}

	const parts = rest.split("&")
	parts.forEach((part, index) => {
		if (index > 0) {
			tokens.push({
				kind: "amp",
				text: "&",
				className: tokenClassName(tokens.length),
			})
		}

		if (part.length === 0) {
			return
		}

		tokens.push({
			kind: "param",
			text: part,
			className: tokenClassName(tokens.length),
		})
	})

	return tokens
}
