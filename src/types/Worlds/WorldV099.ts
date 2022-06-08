import type { WorldV095 } from "./WorldV095";

export type WorldV099<TInterestingTypes extends number = number> = WorldV095<TInterestingTypes> & {
	savedAngler: boolean;
};
