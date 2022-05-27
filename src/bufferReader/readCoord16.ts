import type { ByteBuffer } from "../types/ByteBuffer";
import type { Coordinate } from "../types/Coordinate";
import { readInt16 } from "./readInt16";

export const readCoord16 = (byteBuffer: Pick<ByteBuffer, "readInt16">): Coordinate => {
	const x = readInt16(byteBuffer);
	const y = readInt16(byteBuffer);
	return { x, y };
};
