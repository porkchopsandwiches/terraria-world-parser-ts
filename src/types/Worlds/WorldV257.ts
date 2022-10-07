import type { WorldV251 } from "./WorldV251";

export type WorldV257<TInterestingTypes extends number = number> = WorldV251<TInterestingTypes> & {
	afterPartyOfDoom: boolean;
};
