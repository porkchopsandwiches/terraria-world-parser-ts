import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readInt16: (worldDataSource: Pick<WorldDataSource, "readInt16">) => number = invoker(0, "readInt16");
