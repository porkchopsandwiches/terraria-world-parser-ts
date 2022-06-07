import type { ChestItem } from "./ChestItem";
import type { Coordinate } from "./Coordinate";
import type { TileData } from "./TileData";

export type Chest = {
	coord: Coordinate;
	name: string;
	items: (ChestItem | undefined)[];
	tile: TileData;
	enabled: boolean;
}
