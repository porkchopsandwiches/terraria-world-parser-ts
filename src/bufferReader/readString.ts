import type { ByteBuffer } from "../types/ByteBuffer";
import { readInt8 } from "./readInt8";

export const readString = (byteBuffer: Pick<ByteBuffer, "readUTF8String" | "readInt8">) => {
	const length = readInt8(byteBuffer);
	return byteBuffer.readUTF8String(length);
};
