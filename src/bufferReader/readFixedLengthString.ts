import type { ByteBuffer } from "../types/ByteBuffer";

export const readFixedLengthString = (byteBuffer: Pick<ByteBuffer, "readUTF8String" | "readInt8">, length: number) => {
	return byteBuffer.readUTF8String(length);
};
