import type { WorldV215 } from "./WorldV215";

export type WorldV216<TInterestingTypes extends number = number> = WorldV215<TInterestingTypes> & {
	copperTypeId: number;
	ironTypeId: number;
	silverTypeId: number;
	goldTypeId: number;
};
