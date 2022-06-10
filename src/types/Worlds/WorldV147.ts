import type { WorldV141 } from "./WorldV141";

export type WorldV147<TInterestingTypes extends number = number> = WorldV141<TInterestingTypes> & {
	expertMode: boolean;
	slimeRainTime: number;
};
