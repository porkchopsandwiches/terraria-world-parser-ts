import type { WorldV222 } from "./WorldV222";

export type WorldV223<TInterestingTypes extends number = number> = WorldV222<TInterestingTypes> & {
	killedEmpressOfLight: boolean;
	killedQueenSlime: boolean;
};
