import type { EntityType } from "../enums/EntityType";
import type { Coordinate } from "./Coordinate";

export type Entity = {
	type: EntityType;
	id: number;
	position: Coordinate;
};
