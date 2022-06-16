import type { ChestSlot } from "./ChestSlot";
import type { Coordinate } from "./Coordinate";

export type Chest = {
	coord: Coordinate;
	name: string;
	slots: Array<ChestSlot | undefined>;
	enabled: boolean;
};
