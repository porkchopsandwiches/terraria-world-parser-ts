import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readUInt16: (worldDataSource: Pick<WorldDataSource, "readUint16">) => number = invoker(0, "readUint16");
