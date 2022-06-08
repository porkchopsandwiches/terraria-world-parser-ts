import type { TownManagerRecord } from "../TownManagerRecord";
import type { WorldV181 } from "./WorldV181";

export type WorldV189<TInterestingTypes extends number = number> = WorldV181<TInterestingTypes> & {
	townManagerRecords: TownManagerRecord[];
};
