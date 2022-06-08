import type { WorldV227 } from "./WorldV227";

export type WorldV238<TInterestingTypes extends number = number> = WorldV227<TInterestingTypes> & {
	tenthAnniversaryWorld: boolean;
};
