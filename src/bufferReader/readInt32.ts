import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readInt32: (worldDataSource: Pick<WorldDataSource, "readInt32">) => number = invoker(0, "readInt32");
