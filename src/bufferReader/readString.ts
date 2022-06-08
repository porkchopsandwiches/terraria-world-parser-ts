import type { WorldDataSource } from "../types/WorldDataSource";
import { readInt8 } from "./readInt8";

export const readString = (worldDataSource: Pick<WorldDataSource, "readUTF8String" | "readInt8">) => {
	const length = readInt8(worldDataSource);
	return worldDataSource.readUTF8String(length);
};
