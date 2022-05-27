import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readByte: (byteBuffer: Pick<ByteBuffer, "readUint8">) => number = invoker(0, "readUint8");
