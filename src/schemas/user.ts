import { z } from "zod"

/** Sparse-friendly: Spatie `fields[users]=…` may omit columns. */
export const userSchema = z.object({
	id: z.number().optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	status: z.string().optional(),
})

export type User = z.infer<typeof userSchema>

export const userListDataSchema = z.object({
	data: z.array(userSchema),
})

export type UserListData = z.infer<typeof userListDataSchema>
