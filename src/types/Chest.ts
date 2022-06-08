import type { ChestItem } from "./ChestItem";
import type { Coordinate } from "./Coordinate";

export type Chest = {
	coord: Coordinate;
	name: string;
	items: Array<ChestItem | undefined>;
	enabled: boolean;
};
