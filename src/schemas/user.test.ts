import { describe, expect, it } from "vitest"
import { userListDataSchema } from "./user"

describe("userListDataSchema", () => {
	it("accepts sparse Spatie fields[users]=id,name payloads", () => {
		const parsed = userListDataSchema.parse({
			data: [{ id: 1, name: "Alice Johnson" }],
		})

		expect(parsed.data).toEqual([{ id: 1, name: "Alice Johnson" }])
	})

	it("still accepts full user rows", () => {
		const parsed = userListDataSchema.parse({
			data: [
				{
					id: 1,
					name: "Alice Johnson",
					email: "alice@example.com",
					status: "active",
				},
			],
		})

		expect(parsed.data[0]?.email).toBe("alice@example.com")
	})

	it("accepts included posts and permissions", () => {
		const parsed = userListDataSchema.parse({
			data: [
				{
					id: 1,
					name: "Alice Johnson",
					posts: [{ id: 10, title: "Hello" }],
					permissions: [{ id: 2, name: "edit articles" }],
				},
			],
		})

		expect(parsed.data[0]?.posts?.[0]?.title).toBe("Hello")
		expect(parsed.data[0]?.permissions?.[0]?.name).toBe("edit articles")
	})
})
