import type { Entity } from "../Entity";
import type { WorldV104 } from "./WorldV104";

export type WorldV122 = WorldV104 & {
	entities: Entity[];
}
