import type { Chest } from "../Chest";
import type { Coordinate } from "../Coordinate";
import type { Dimensions } from "../Dimensions";
import type { NPC } from "../NPC";
import type { Rectangle } from "../Rectangle";
import type { Sign } from "../Sign";
import type { Tile } from "../Tile";
import type { BeatenBosses } from "./BeatenBosses/BeatenBosses";
import type { Events } from "./Events/Events";
import type { SavedNPCs } from "./SavedNPCs/SavedNPCs";

export type WorldBase<
	TWorldBeatenBosses extends BeatenBosses = BeatenBosses,
	TWorldSavedNPCs extends SavedNPCs = SavedNPCs,
	TWorldEvents extends Events = Events
	> = Dimensions & {
	version: number;
	title: string;
	id: number;
	frame: Rectangle;
	moonType: number;
	treeX: number[];
	treeStyle: number[];
	caveBackX: number[];
	caveBackStyle: number[];
	iceBackStyle: number;
	jungleBackStyle: number;
	hellBackStyle: number;
	spawn: Coordinate;
	groundLevel: number;
	rockLevel: number;
	time: number;
	isDayTime: boolean;
	moonPhase: number;
	isBloodMoon: boolean;
	isEclipse: boolean;
	isCrimson: boolean;
	dungeon: Coordinate;

	beaten: TWorldBeatenBosses;
	saved: TWorldSavedNPCs;
	events: TWorldEvents;

	shadowOrbSmashed: boolean;
	spawnMeteor: boolean;
	shadowOrbCount: number;
	altarCount: number;
	hardMode: boolean;
	invasionDelay: number;
	invasionSize: number;
	invasionType: number;
	invasionX: number;

	tempRaining: boolean;
	tempRainTime: number;
	tempMaxRain: number;
	oreTier1: number;
	oreTier2: number;
	oreTier3: number;
	treeBg: number;
	corruptionBg: number;
	jungleBg: number;
	snowBg: number;
	hallowBg: number;
	crimsonBg: number;
	desertBg: number;
	oceanBg: number;
	cloudBgActive: number;
	numClouds: number;
	windSpeedSet: number;

	tiles: Tile[][];
	// chests: IWorldChest[];
	signs: Sign[];
	npcs: NPC[];

	tileFrameImportance: boolean[];
	sectionPointers: number[];

	gems: Record<string, number>;
	ores: Record<string, number>;
	chests: Chest[];
}
