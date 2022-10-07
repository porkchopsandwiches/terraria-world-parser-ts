import type { WorldV257 } from "./WorldV257";

export type WorldV259<TInterestingTypes extends number = number> = WorldV257<TInterestingTypes> & {
	combatBookVolumeTwoUsed: boolean;
};
