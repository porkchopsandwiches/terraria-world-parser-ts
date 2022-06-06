import type { WorldV147 } from "./WorldV147";

export type WorldV170 = WorldV147 & {
	partyManual: boolean;
	partyGenuine: boolean;
	partyCooldown: number;
	partyingNPCs: number[];
}
