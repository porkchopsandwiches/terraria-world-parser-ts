import type { WorldDataSource } from "../types/WorldDataSource";

export const getOffset = (worldDataSource: Pick<WorldDataSource, "offset">): number => {
	return worldDataSource.offset;
};
