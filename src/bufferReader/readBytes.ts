import { map, partial, pipe, range } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";
import { readByte } from "./readByte";

export const readBytes = (length: number, byteBuffer: Pick<ByteBuffer, "readUint8">): number[] => {
	const boundReadByte = partial(readByte, [byteBuffer]) as () => number;
	return pipe(range(0), map(boundReadByte))(length);
};
