import type { WorldV264 } from "./WorldV264";

export type WorldV266<TInterestingTypes extends number = number> = WorldV264<TInterestingTypes> & {
	isNoTrapsWorld: boolean;
};
