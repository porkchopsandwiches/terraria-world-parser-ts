import type { WorldV259 } from "./WorldV259";

export type WorldV260<TInterestingTypes extends number = number> = WorldV259<TInterestingTypes> & {
	peddlersSatchelUsed: boolean;
};
