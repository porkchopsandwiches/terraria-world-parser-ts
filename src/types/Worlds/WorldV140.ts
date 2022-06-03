import type { NPC } from "../NPC";
import type { TileEntity } from "../TileEntity";
import type { WorldV104 } from "./WorldV104";

export type WorldV140 = WorldV104 & {
	mobs: NPC[];
	fileRevision: number;
	invasionSizeStart: number;
	cultistDelay: number;
	numberOfMobs: number;
	killedMobs: number[];
	fastForwardTime: boolean;
	tileEntitiesNumber: number;
	tileEntities: TileEntity[];
	savedTaxCollector: boolean;

	beatFishron: boolean;
	beatMartians: boolean;
	beatLunaticCultist: boolean;
	beatMoonlord: boolean;
	beatHalloweenKing: boolean;
	beatHalloweenTree: boolean;
	beatChristmasQueen: boolean;
	beatSanta: boolean;
	beatChristmasTree: boolean;
	celestialSolarDown: boolean;
	celestialVortexDown: boolean;
	celestialNebulaDown: boolean;
	celestialStardustDown: boolean;
	celestialSolarActive: boolean;
	celestialVortexActive: boolean;
	celestialNebulaActive: boolean;
	celestialStardustActive: boolean;
	apocalypse: boolean;
}
