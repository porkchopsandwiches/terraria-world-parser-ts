import type { WorldV204 } from "./WorldV204";

export type WorldV207 = WorldV204 & {
	lanternNightCooldown: number;
	realLanternNight: boolean;
	manualLanternNight: boolean;
	nextLanternNightWillBeGenuine: boolean;
}
