import { useQuery } from "@tanstack/react-query"
import { env } from "@/env"
import { userListDataSchema, type UserListData } from "@/schemas"

export type UseListUsersArgs = {
	queryString: string
}

async function listUsers(queryString: string): Promise<UserListData> {
	const response = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/api/users${queryString}`,
	)

	if (!response.ok) {
		throw new Error(`Failed to list users (${response.status})`)
	}

	return userListDataSchema.parse(await response.json())
}

export function useListUsers(args: UseListUsersArgs) {
	return useQuery({
		queryKey: ["user.list", args.queryString],
		queryFn: () => listUsers(args.queryString),
	})
}
