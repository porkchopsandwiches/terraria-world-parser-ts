import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readUInt32: (byteBuffer: Pick<ByteBuffer, "readUint32">) => number = invoker(0, "readUint32");
