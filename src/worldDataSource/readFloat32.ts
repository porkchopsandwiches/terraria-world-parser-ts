import { divide, flip, invoker, partial, pipe } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readFloat32: (worldDataSource: Pick<WorldDataSource, "readFloat32">) => number = pipe(invoker(0, "readFloat32"), partial(flip(divide), [16])) as never;
