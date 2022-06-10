import type { WorldDataSource } from "../types/WorldDataSource";
import type { Coordinate } from "../types/Coordinate";
import { readFloat32 } from "./readFloat32";

export const readCoordFloat = (worldDataSource: Pick<WorldDataSource, "readFloat32">): Coordinate => {
	const x = readFloat32(worldDataSource);
	const y = readFloat32(worldDataSource);
	return { x, y };
};
