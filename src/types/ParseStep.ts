import type { ByteBuffer } from "./ByteBuffer";
import type { WorldBase } from "./Worlds/WorldBase";

export type ParseStep<TInputWorld extends Partial<WorldBase>, TOutputWorld extends TInputWorld> = (byteBuffer: Readonly<ByteBuffer>, sourceWorld: Readonly<TInputWorld>) => Promise<TOutputWorld>;
