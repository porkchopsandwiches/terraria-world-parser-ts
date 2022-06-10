import type { NPC } from "../NPC";
import type { WorldV122 } from "./WorldV122";

export type WorldV140<TInterestingTypes extends number = number> = WorldV122<TInterestingTypes> & {
	homelessNPCs: NPC[];
	fileRevision: number;
	invasionSizeStart: number;
	cultistDelay: number;
	numberOfMobs: number;
	killedMobs: number[];
	fastForwardTime: boolean;
	tileEntitiesNumber: number;
	savedTaxCollector: boolean;

	beatBossFishron: boolean;
	beatInvasionMartians: boolean;
	beatBossLunaticCultist: boolean;
	beatBossMoonlord: boolean;
	beatBossPumpking: boolean;
	beatBossSpookyWood: boolean;
	beatBossIceQueen: boolean;
	beatBossSanTank: boolean;
	beatBossChristmasTree: boolean;
	celestialSolarDown: boolean;
	celestialVortexDown: boolean;
	celestialNebulaDown: boolean;
	celestialStardustDown: boolean;
	celestialSolarActive: boolean;
	celestialVortexActive: boolean;
	celestialNebulaActive: boolean;
	celestialStardustActive: boolean;
	apocalypse: boolean;
};
