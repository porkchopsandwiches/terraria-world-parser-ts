import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readUInt16: (byteBuffer: Pick<ByteBuffer, "readUint16">) => number = invoker(0, "readUint16");
