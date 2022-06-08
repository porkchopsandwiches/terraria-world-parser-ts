import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readFloat64: (worldDataSource: Pick<WorldDataSource, "readFloat64">) => number = invoker(0, "readFloat64");
