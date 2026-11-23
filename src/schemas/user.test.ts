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
})
