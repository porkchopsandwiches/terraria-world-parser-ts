import type { NamedColorDefinition } from "./NamedColorDefinition";

export type TileVariationDefinition = NamedColorDefinition & {
	v?: number;
	u?: number;
	minV?: number;
	minU?: number;
	maxV?: number;
	maxU?: number;
	variations: TileVariationDefinition[];
	lightR: number;
	lightG: number;
	lightB: number;
};
