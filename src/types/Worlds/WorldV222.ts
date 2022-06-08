import type { WorldV217 } from "./WorldV217";

export type WorldV222<TInterestingTypes extends number = number> = WorldV217<TInterestingTypes> & {
	isDrunkWorld: boolean;
}
