import type { WorldV267 } from "./WorldV267";

export type WorldV268<TInterestingTypes extends number = number> = WorldV267<TInterestingTypes> & {
	shimmeredTownNpcs: number[];
};
