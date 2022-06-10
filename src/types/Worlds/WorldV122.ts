import type { Entity } from "../Entity";
import type { WorldV118 } from "./WorldV118";

export type WorldV122<TInterestingTypes extends number = number> = WorldV118<TInterestingTypes> & {
	entities: Entity[];
};
