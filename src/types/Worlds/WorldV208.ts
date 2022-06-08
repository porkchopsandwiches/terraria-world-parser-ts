import type { WorldV207 } from "./WorldV207";

export type WorldV208<TInterestingTypes extends number = number> = WorldV207<TInterestingTypes> & {
	masterMode: boolean;
};
