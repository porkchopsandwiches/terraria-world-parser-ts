import type { WorldV140 } from "./WorldV140";

export type WorldV141<TInterestingTypes extends number = number> = WorldV140<TInterestingTypes> & {
	creationTime: number[];
}
