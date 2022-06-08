import type { WorldDataSource } from "../types/WorldDataSource";
import { applyOffset } from "./applyOffset";

export const reset = (worldDataSource: Pick<WorldDataSource, "offset">) => {
	return applyOffset(0, worldDataSource);
};
