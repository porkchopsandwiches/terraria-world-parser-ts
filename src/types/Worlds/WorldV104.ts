import type { WorldV101 } from "./WorldV101";

export type WorldV104<TInterestingTypes extends number = number> = WorldV101<TInterestingTypes> & {
	savedStylist: boolean;
};
