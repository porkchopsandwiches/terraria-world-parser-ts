import { divide, flip, invoker, partial, pipe } from "ramda";
import type { ByteBuffer } from "../types/ByteBuffer";

export const readFloat32: (byteBuffer: Pick<ByteBuffer, "readFloat32">) => number = pipe(invoker(0, "readFloat32"), partial(flip(divide), [16])) as never;
