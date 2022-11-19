import type { PlayerV256 } from "./PlayerV256";

export type PlayerV260 = PlayerV256 & {
	usedAegisCrystal: boolean;
	usedAegisFruit: boolean;
	usedArcaneCrystal: boolean;
	usedGalaxyPearl: boolean;
	usedGummyWorm: boolean;
	usedAmbrosia: boolean;
};
