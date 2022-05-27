import type { ByteBuffer } from "../types/ByteBuffer";

export const applyOffset = (offset: number, byteBuffer: Pick<ByteBuffer, "offset">): number => {
	byteBuffer.offset = offset;
	return offset;
};
