import type { Chest } from "../../types/Chest";
import type { Coordinate } from "../../types/Coordinate";

export const chestFactory = (coord: Coordinate, name: string): Chest => {
	return {
		coord,
		name,
		slots: [],
		enabled: true,
	};
};
