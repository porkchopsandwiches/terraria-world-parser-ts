import type { WorldV201 } from "./WorldV201";

export type WorldV204<TInterestingTypes extends number = number> = WorldV201<TInterestingTypes> & {
	combatBookUsed: boolean;
}
