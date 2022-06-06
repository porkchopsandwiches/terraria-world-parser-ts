import type { TownManagerRecord } from "../TownManagerRecord";
import type { WorldV181 } from "./WorldV181";

export type WorldV189 = WorldV181 & {
	townManagerRecords: TownManagerRecord[];
};
