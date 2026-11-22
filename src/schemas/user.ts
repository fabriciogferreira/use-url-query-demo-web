import { z } from "zod"

export const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string(),
	status: z.string(),
})

export type User = z.infer<typeof userSchema>

export const userListDataSchema = z.object({
	data: z.array(userSchema),
})

export type UserListData = z.infer<typeof userListDataSchema>
