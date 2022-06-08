import type { WorldDataSource } from "./WorldDataSource";

export type ParseStep<TInputWorld extends Record<string, unknown>, TOutputWorld extends Record<string, unknown>> = (worldDataSource: Readonly<WorldDataSource>, sourceWorld: Readonly<TInputWorld>) => Promise<TOutputWorld>;
