import type { ByteBuffer } from "../types/ByteBuffer";
import type { Rectangle } from "../types/Rectangle";
import { readInt32 } from "./readInt32";

export const readRectangle32 = (byteBuffer: Pick<ByteBuffer, "readInt32">): Rectangle => {
	const left = readInt32(byteBuffer);
	const right = readInt32(byteBuffer);
	const top = readInt32(byteBuffer);
	const bottom = readInt32(byteBuffer);
	return { left, right, bottom, top };
};
