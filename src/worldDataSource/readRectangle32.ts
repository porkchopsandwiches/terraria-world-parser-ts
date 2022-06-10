import type { WorldDataSource } from "../types/WorldDataSource";
import type { Rectangle } from "../types/Rectangle";
import { readInt32 } from "./readInt32";

export const readRectangle32 = (worldDataSource: Pick<WorldDataSource, "readInt32">): Rectangle => {
	const left = readInt32(worldDataSource);
	const right = readInt32(worldDataSource);
	const top = readInt32(worldDataSource);
	const bottom = readInt32(worldDataSource);
	return { left, right, bottom, top };
};
