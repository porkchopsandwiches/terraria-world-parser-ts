import type { WorldBase } from "./WorldBase";

export type WorldV095<TInterestingTypes extends number = number> = WorldBase<TInterestingTypes> & {
	anglers: string[];
}
