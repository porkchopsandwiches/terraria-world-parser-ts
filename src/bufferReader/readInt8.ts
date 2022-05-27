import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readInt8: (byteBuffer: Pick<ByteBuffer, "readInt8">) => number = invoker(0, "readInt8");
