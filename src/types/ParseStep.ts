import type { ByteBuffer } from "./ByteBuffer";

export type ParseStep<TInputWorld extends Record<string, unknown>, TOutputWorld extends Record<string, unknown>> = (byteBuffer: Readonly<ByteBuffer>, sourceWorld: Readonly<TInputWorld>) => Promise<TOutputWorld>;
