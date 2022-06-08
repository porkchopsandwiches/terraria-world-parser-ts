import type { WorldV170 } from "./WorldV170";

export type WorldV174<TInterestingTypes extends number = number> = WorldV170<TInterestingTypes> & {
	sandstormHappening: boolean;
	sandstormTimeLeft: number;
	sandstormSeverity: number;
	sandstormIntendedSeverity: number;
}
