import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

// Variáveis novas entram em server ou client, e de novo em runtimeEnv.
// O import em next.config.ts dispara a validação.
export const env = createEnv({
	server: {},
	client: {
		NEXT_PUBLIC_API_URL: z.url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
})
