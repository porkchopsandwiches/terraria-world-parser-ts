import { map, partial, pipe, range } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";
import { readInt32 } from "./readInt32";

export const readInt32s = (length: number, byteBuffer: Pick<ByteBuffer, "readInt32">): number[] => {
	const boundReadByte = partial(readInt32, [byteBuffer]) as () => number;
	return pipe(range(0), map(boundReadByte))(length);
};
