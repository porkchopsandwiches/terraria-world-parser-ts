import type { WorldV196 } from "./WorldV196";

export type WorldV201<TInterestingTypes extends number = number> = WorldV196<TInterestingTypes> & {
	savedGolfer: boolean;
}
