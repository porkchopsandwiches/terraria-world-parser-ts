import { invoker } from "ramda";
import type { WorldDataSource } from "../types/WorldDataSource";

export const readByte: (worldDataSource: Pick<WorldDataSource, "readUint8">) => number = invoker(0, "readUint8");
