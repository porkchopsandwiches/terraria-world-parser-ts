import type { EntityType } from "../enums/EntityType";
import type { Entity } from "./Entity";

export type TrainingDummyEntity = Entity & {
	type: EntityType.TrainingDummy;
	npc: number;
};
