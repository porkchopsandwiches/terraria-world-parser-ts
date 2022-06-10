import type { WorldV104 } from "./WorldV104";

export type WorldV113<TInterestingTypes extends number = number> = WorldV104<TInterestingTypes> & {
	sundialCooldown: number;
};
