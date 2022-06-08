import { map, partial, pipe, range } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";
import { readInt32 } from "./readInt32";

export const readInt32s = (length: number, worldDataSource: Pick<WorldDataSource, "readInt32">): number[] => {
	const boundReadByte = partial(readInt32, [worldDataSource]) as () => number;
	return pipe(range(0), map(boundReadByte))(length);
};
