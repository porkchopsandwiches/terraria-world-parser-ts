import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readInt32: (byteBuffer: Pick<ByteBuffer, "readInt32">) => number = invoker(0, "readInt32");
