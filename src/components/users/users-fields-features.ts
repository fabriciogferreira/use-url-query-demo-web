/** Matches demo-api `allowedFields('id', 'name')` for the users table. */
export const USERS_RESOURCE = "users" as const

export const usersAllowedFields = ["id", "name"] as const

export type UsersAllowedField = (typeof usersAllowedFields)[number]
