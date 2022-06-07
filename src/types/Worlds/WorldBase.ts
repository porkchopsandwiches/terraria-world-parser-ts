import type { Chest } from "../Chest";
import type { Coordinate } from "../Coordinate";
import type { Dimensions } from "../Dimensions";
import type { NPC } from "../NPC";
import type { Rectangle } from "../Rectangle";
import type { Sign } from "../Sign";
import type { TileData } from "../TileData";
import type { InterestingTileCounts } from "./InterestingTiles/InterestingTileCounts";

export type WorldBase = Dimensions & {
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

	tiles: TileData[][];
	signs: Sign[];
	npcs: NPC[];

	tileFrameImportance: boolean[];
	sectionPointers: number[];

	interestingTileCounts: InterestingTileCounts;
	chests: Chest[];

	// Saved NPCs
	savedGoblin: boolean;
	savedWizard: boolean;
	savedMech: boolean;

	// Bosses
	beatBoss1: boolean;
	beatBoss2: boolean;
	beatBoss3: boolean;
	beatQueenBee: boolean;
	beatMechBoss1: boolean;
	beatMechBoss2: boolean;
	beatMechBoss3: boolean;
	beatMechBossAny: boolean;
	beatPlantBoss: boolean;
	beatGolemBoss: boolean;

	// Events
	eventsGoblins: boolean;
	eventsClown: boolean;
	eventsFrost: boolean;
	eventsPirates: boolean;
}
