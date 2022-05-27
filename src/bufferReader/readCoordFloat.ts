import type { ByteBuffer } from "../types/ByteBuffer";
import type { Coordinate } from "../types/Coordinate";
import { readFloat32 } from "./readFloat32";

export const readCoordFloat = (byteBuffer: Pick<ByteBuffer, "readFloat32">): Coordinate => {
	const x = readFloat32(byteBuffer);
	const y = readFloat32(byteBuffer);
	return { x, y };
};
