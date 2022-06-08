import type { WorldV238 } from "./WorldV238";

export type WorldV239<TInterestingTypes extends number = number> = WorldV238<TInterestingTypes> & {
	isDontStarveWorld: boolean;
};
