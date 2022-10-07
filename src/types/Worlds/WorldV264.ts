import type { WorldV261 } from "./WorldV261";

export type WorldV264<TInterestingTypes extends number = number> = WorldV261<TInterestingTypes> & {
	fastForwardTimeToDusk: boolean;
	moondialCooldown: number;
};
