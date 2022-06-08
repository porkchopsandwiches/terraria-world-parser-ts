import type { Entity } from "../Entity";
import type { WorldV104 } from "./WorldV104";

export type WorldV122<TInterestingTypes extends number = number> = WorldV104<TInterestingTypes> & {
	entities: Entity[];
};
