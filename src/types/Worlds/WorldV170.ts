import type { Coordinate } from "../Coordinate";
import type { WorldV147 } from "./WorldV147";

export type WorldV170<TInterestingTypes extends number = number> = WorldV147<TInterestingTypes> & {
	partyManual: boolean;
	partyGenuine: boolean;
	partyCooldown: number;
	partyingNPCs: number[];
	pressurePlates: Coordinate[];
};
