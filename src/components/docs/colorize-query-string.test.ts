import { describe, expect, it } from "vitest"
import { colorizeQueryString } from "./colorize-query-string"

describe("colorizeQueryString", () => {
	it("returns a muted empty token when the query is blank", () => {
		expect(colorizeQueryString("")).toEqual([
			{
				kind: "empty",
				text: "(empty)",
				className: "text-muted-foreground",
			},
		])
	})

	it("colors each token in order: ?, param, &, param, …", () => {
		const tokens = colorizeQueryString(
			"?fields[users]=id,name&filter[name]=asdasd",
		)

		expect(tokens.map((token) => [token.kind, token.text])).toEqual([
			["qmark", "?"],
			["param", "fields[users]=id,name"],
			["amp", "&"],
			["param", "filter[name]=asdasd"],
		])

		const classNames = tokens.map((token) => token.className)
		expect(new Set(classNames).size).toBe(4)
	})

	it("does not reuse a key-based color — position decides", () => {
		const withSortFirst = colorizeQueryString("?sort=name&filter[name]=a")
		const withSortSecond = colorizeQueryString("?filter[name]=a&sort=name")

		const sortAsFirst = withSortFirst.find((token) =>
			token.text.startsWith("sort="),
		)
		const sortAsSecond = withSortSecond.find((token) =>
			token.text.startsWith("sort="),
		)

		expect(sortAsFirst?.className).not.toBe(sortAsSecond?.className)
	})
})
