import type { WorldV260 } from "./WorldV260";

export type WorldV261<TInterestingTypes extends number = number> = WorldV260<TInterestingTypes> & {
	unlockedSlimeGreenSpawn: boolean;
	unlockedSlimeOldSpawn: boolean;
	unlockedSlimePurpleSpawn: boolean;
	unlockedSlimeRainbowSpawn: boolean;
	unlockedSlimeRedSpawn: boolean;
	unlockedSlimeYellowSpawn: boolean;
	unlockedSlimeCopperSpawn: boolean;
};
