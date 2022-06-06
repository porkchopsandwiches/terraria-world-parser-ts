import type { BestiaryKill } from "../BestiaryKill";
import type { WorldV209 } from "./WorldV209";

export type WorldV210 = WorldV209 & {
	bestiaryKills: BestiaryKill[];
	bestiarySeen: string[];
	bestiaryChatted: string[];
}
