import type { Chest } from "../Chest";
import type { Coordinate } from "../Coordinate";
import type { Dimensions } from "../Dimensions";
import type { NPC } from "../NPC";
import type { Rectangle } from "../Rectangle";
import type { Sign } from "../Sign";
import type { TileData } from "../TileData";
import type { InterestingTileCounts } from "../InterestingTileCounts";

export type WorldBase<TInterestingTypes extends number = number> = Dimensions & {
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

	rainIsHappening: boolean;
	rainTime: number;
	rainMaximum: number;
	oreTier1: number;
	oreTier2: number;
	oreTier3: number;
	styleOfTree: number;
	styleOfCorruption: number;
	styleOfJungle: number;
	styleOfSnow: number;
	styleOfHallow: number;
	styleOfCrimson: number;
	styleOfDesert: number;
	styleOfOcean: number;
	cloudBackground: number;
	cloudCount: number;
	windSpeedSet: number;

	tiles: Array<Array<TileData<TInterestingTypes>>>;
	signs: Sign[];
	npcs: NPC[];

	tileFrameImportance: boolean[];
	sectionPointers: number[];

	interestingTileCounts: InterestingTileCounts<TInterestingTypes>;
	chests: Chest[];

	// Saved NPCs
	savedGoblin: boolean;
	savedWizard: boolean;
	savedMech: boolean;

	// Bosses
	beatBossEyeOfCthulu: boolean;
	beatBossEaterOfWorldsOrBrainOfCthulu: boolean;
	beatBossSkeletron: boolean;
	beatBossQueenBee: boolean;
	beatBossTheDestroyer: boolean;
	beatBossTheTwins: boolean;
	beatBossSkeletronPrime: boolean;
	beatBossAnyMechanicalBoss: boolean;
	beatBossPlantera: boolean;
	beatBossGolem: boolean;

	// Events
	beatInvasionGoblins: boolean;
	beatClown: boolean;
	beatInvasionFrostLegion: boolean;
	beatInvasionPirates: boolean;
};
