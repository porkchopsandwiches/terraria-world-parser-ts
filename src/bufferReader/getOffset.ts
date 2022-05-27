import type { ByteBuffer } from "../types/ByteBuffer";

export const getOffset = (byteBuffer: Pick<ByteBuffer, "offset">): number => {
	return byteBuffer.offset;
};
