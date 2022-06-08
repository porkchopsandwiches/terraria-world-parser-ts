import type { BestiaryKill } from "../BestiaryKill";
import type { WorldV209 } from "./WorldV209";

export type WorldV210<TInterestingTypes extends number = number> = WorldV209<TInterestingTypes> & {
	bestiaryKills: BestiaryKill[];
	bestiarySeen: string[];
	bestiaryChatted: string[];
};
