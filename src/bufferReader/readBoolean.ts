import { invoker, not, pipe } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readBoolean: (byteBuffer: Pick<ByteBuffer, "readUint8">) => boolean = pipe(invoker(0, "readUint8"), not, not);
