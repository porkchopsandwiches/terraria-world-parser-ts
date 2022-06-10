import { map, partial, pipe, range } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";
import { readByte } from "./readByte";

export const readBytes = (length: number, worldDataSource: Pick<WorldDataSource, "readUint8">): number[] => {
	const boundReadByte = partial(readByte, [worldDataSource]) as () => number;
	return pipe(range(0), map(boundReadByte))(length);
};
