import type { ByteBuffer } from "./ByteBuffer";

export type ParseAggregateStep<TInputWorld extends Record<string, unknown>, TOutputWorld extends Record<string, unknown>> = (byteBuffer: Readonly<ByteBuffer>, sourceWorld: Readonly<TInputWorld>) => Promise<TInputWorld & TOutputWorld>;
