import type { WorldV249 } from "./WorldV249";

export type WorldV250<TInterestingTypes extends number = number> = WorldV249<TInterestingTypes> & {
	unlockedSlimeBlueSpawn: boolean;
};
