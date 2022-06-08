import type { WorldV178 } from "./WorldV178";

export type WorldV179<TInterestingTypes extends number = number> = WorldV178<TInterestingTypes> & {
	seed: string;
	genVersion: number[];
};
