import { tableFeatures } from "@tanstack/react-table"

// Server-side Spatie sorting via useUrlQuery — no client rowSortingFeature.
export const usersSortTableFeatures = tableFeatures({})

export type UsersSortTableFeatures = typeof usersSortTableFeatures
