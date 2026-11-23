import { z } from "zod"

/** Sparse-friendly: Spatie `fields[users]=…` may omit columns. */
export const userPostSchema = z.object({
	id: z.number().optional(),
	title: z.string().optional(),
	user_id: z.number().optional(),
})

export const userPermissionSchema = z.object({
	id: z.number().optional(),
	name: z.string().optional(),
})

export const userSchema = z.object({
	id: z.number().optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	status: z.string().optional(),
	posts: z.array(userPostSchema).optional(),
	permissions: z.array(userPermissionSchema).optional(),
})

export type User = z.infer<typeof userSchema>


export const userListDataSchema = z.object({
	data: z.array(userSchema),
})

export type UserListData = z.infer<typeof userListDataSchema>
