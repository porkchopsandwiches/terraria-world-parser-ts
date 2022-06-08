import type { WorldV099 } from "./WorldV099";

export type WorldV101<TInterestingTypes extends number = number> = WorldV099<TInterestingTypes> & {
	anglerQuest: number;
};
