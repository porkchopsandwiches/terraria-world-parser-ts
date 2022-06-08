import type { WorldV204 } from "./WorldV204";

export type WorldV207<TInterestingTypes extends number = number> = WorldV204<TInterestingTypes> & {
	lanternNightCooldown: number;
	realLanternNight: boolean;
	manualLanternNight: boolean;
	nextLanternNightWillBeGenuine: boolean;
}
