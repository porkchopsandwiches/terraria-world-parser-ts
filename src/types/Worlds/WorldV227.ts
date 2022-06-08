import type { WorldV223 } from "./WorldV223";

export type WorldV227<TInterestingTypes extends number = number> = WorldV223<TInterestingTypes> & {
	isGetGoodWorld: boolean;
}
