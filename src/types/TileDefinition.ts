import type { TileVariationDefinition } from "./TileVariationDefinition";
import type { WallDefinition } from "./WallDefinition";

export type TileDefinition = WallDefinition & {
	solid: boolean;
	hasExtra: boolean;
	merge: boolean;
	isStone: boolean;
	isGrass: boolean;
	letLightThrough: boolean;
	variations: TileVariationDefinition[];
};
