import type { WorldV212 } from "./WorldV212";

export type WorldV215<TInterestingTypes extends number = number> = WorldV212<TInterestingTypes> & {
	style9: number;
};
