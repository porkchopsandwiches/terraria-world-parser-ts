import type { WorldDataSource } from "../types/WorldDataSource";
import type { Coordinate } from "../types/Coordinate";
import { readInt32 } from "./readInt32";

export const readCoord32 = (worldDataSource: Pick<WorldDataSource, "readInt32">): Coordinate => {
	const x = readInt32(worldDataSource);
	const y = readInt32(worldDataSource);
	return { x, y };
};
