import type { WorldV211 } from "./WorldV211";

export type WorldV212<TInterestingTypes extends number = number> = WorldV211<TInterestingTypes> & {
	forcedHalloween: boolean;
	forcedChristmas: boolean;
};
