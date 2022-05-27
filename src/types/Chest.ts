import type { ChestItem } from "./ChestItem";
import type { Coordinate } from "./Coordinate";
import type { Tile } from "./Tile";

export type Chest = {
	coord: Coordinate;
	name: string;
	items: (ChestItem | undefined)[];
	tile: Tile;
	enabled: boolean;
}
