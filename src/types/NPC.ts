import type { Coordinate } from "./Coordinate";

export type NPC = {
	spriteId: number;
	spriteName: string;
	displayName: string;
	position: Coordinate;
	home?: Coordinate;
	isHomeless: boolean;
	townVariation?: number;
}
