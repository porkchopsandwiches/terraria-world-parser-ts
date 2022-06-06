import type { Chest } from "../../types/Chest";
import type { Coordinate } from "../../types/Coordinate";
import type { Tile } from "../../types/Tile";

export const chestFactory = (coord: Coordinate, name: string, tile: Tile): Chest => {
	return {
		coord,
		name,
		tile,
		items: [],
		enabled: true,
	};
};
