import type { WorldV174 } from "./WorldV174";

export type WorldV178<TInterestingTypes extends number = number> = WorldV174<TInterestingTypes> & {
	invasionTier1: boolean;
	invasionTier2: boolean;
	invasionTier3: boolean;
	savedBartender: boolean;
}
