import type { WorldV241 } from "./WorldV241";

export type WorldV249<TInterestingTypes extends number = number> = WorldV241<TInterestingTypes> & {
	isRemixWorld: boolean;
};
