import type { Chest } from "../../types/Chest";
import type { Coordinate } from "../../types/Coordinate";
import type { TileData } from "../../types/TileData";

export const chestFactory = (coord: Coordinate, name: string, tile: TileData): Chest => {
	return {
		coord,
		name,
		tile,
		items: [],
		enabled: true,
	};
};
