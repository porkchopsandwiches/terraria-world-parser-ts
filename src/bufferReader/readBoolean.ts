import { invoker, not, pipe } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readBoolean: (worldDataSource: Pick<WorldDataSource, "readUint8">) => boolean = pipe(invoker(0, "readUint8"), not, not);
