import type { WorldV113 } from "./WorldV113";

export type WorldV118<TInterestingTypes extends number = number> = WorldV113<TInterestingTypes> & {
	beatBossSlimeKing: boolean;
};
