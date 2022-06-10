import type { WorldDataSource } from "../types/WorldDataSource";
import type { Coordinate } from "../types/Coordinate";
import { readInt16 } from "./readInt16";

export const readCoord16 = (worldDataSource: Pick<WorldDataSource, "readInt16">): Coordinate => {
	const x = readInt16(worldDataSource);
	const y = readInt16(worldDataSource);
	return { x, y };
};
