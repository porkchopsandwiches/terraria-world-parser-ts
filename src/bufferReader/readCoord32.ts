import type { ByteBuffer } from "../types/ByteBuffer";
import type { Coordinate } from "../types/Coordinate";
import { readInt32 } from "./readInt32";

export const readCoord32 = (byteBuffer: Pick<ByteBuffer, "readInt32">): Coordinate => {
	const x = readInt32(byteBuffer);
	const y = readInt32(byteBuffer);
	return { x, y };
};
