import type { WorldDataSource } from "../types/WorldDataSource";

export const applyOffset = (offset: number, worldDataSource: Pick<WorldDataSource, "offset">): number => {
	worldDataSource.offset = offset;
	return offset;
};
