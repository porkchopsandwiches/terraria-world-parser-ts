import type { ByteBuffer } from "../types/ByteBuffer";
import { applyOffset } from "./applyOffset";

export const reset = (byteBuffer: Pick<ByteBuffer, "offset">) => {
	return applyOffset(0, byteBuffer);
};
