import type { WorldV266 } from "./WorldV266";

export type WorldV267<TInterestingTypes extends number = number> = WorldV266<TInterestingTypes> & {
	isZenithWorld: boolean;
};
