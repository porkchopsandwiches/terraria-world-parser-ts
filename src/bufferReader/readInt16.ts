import { invoker } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readInt16: (byteBuffer: Pick<ByteBuffer, "readInt16">) => number = invoker(0, "readInt16");
