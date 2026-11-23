export const usersAllowedIncludes = ["posts", "permissions"] as const

export type UsersAllowedInclude = (typeof usersAllowedIncludes)[number]
