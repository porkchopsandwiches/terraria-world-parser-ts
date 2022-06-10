import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readUInt32: (worldDataSource: Pick<WorldDataSource, "readUint32">) => number = invoker(0, "readUint32");
