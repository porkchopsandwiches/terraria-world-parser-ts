import type { WorldDataSource } from "../types/WorldDataSource";

export const readFixedLengthString = (worldDataSource: Pick<WorldDataSource, "readUTF8String" | "readInt8">, length: number) => {
	return worldDataSource.readUTF8String(length);
};
