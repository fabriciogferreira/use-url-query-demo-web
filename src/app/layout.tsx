import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/components"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "use-url-query demo",
	description: "Demo front for @fabriciogferreira/use-url-query",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(
				"h-full",
				"antialiased",
				geistSans.variable,
				geistMono.variable,
				"font-sans",
				inter.variable,
			)}
		>
			<body className="flex min-h-full flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						<TooltipProvider>
							{children}
							<Toaster />
						</TooltipProvider>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
