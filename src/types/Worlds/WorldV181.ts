import type { WorldV179 } from "./WorldV179";

export type WorldV181<TInterestingTypes extends number = number> = WorldV179<TInterestingTypes> & {
	guid: number[];
};
