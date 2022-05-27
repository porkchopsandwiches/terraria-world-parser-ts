import type { Coordinate } from "./Coordinate";

export type NPC = {
	spriteId: number;
	name: string;
	displayName: string;
	position: Coordinate;
	home: Coordinate;
	isHomeless: boolean;
}
