import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readFloat64: (byteBuffer: Pick<ByteBuffer, "readFloat64">) => number = invoker(0, "readFloat64");
