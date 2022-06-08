import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readInt8: (worldDataSource: Pick<WorldDataSource, "readInt8">) => number = invoker(0, "readInt8");
