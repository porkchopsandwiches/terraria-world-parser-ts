import type { WorldV240 } from "./WorldV240";

export type WorldV241<TInterestingTypes extends number = number> = WorldV240<TInterestingTypes> & {
	isNotTheBeesWorld: boolean;
}
