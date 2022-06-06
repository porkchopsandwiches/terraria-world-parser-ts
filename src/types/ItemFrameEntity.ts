import type { EntityType } from "../enums/EntityType";
import type { Entity } from "./Entity";

export type ItemFrameEntity = Entity & {
	type: EntityType.ItemFrame;
	itemId: number;
	itemPrefix: number;
	itemStack: number;
};
