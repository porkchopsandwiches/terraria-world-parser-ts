import type { LiquidType } from "../enums/LiquidType";
import type { TileActiveFlags } from "../enums/TileActiveFlags";
import type { TileFlags } from "../enums/TileFlags";

export type TileData<TInterestingTypes extends number = number> = {
	// Active Flags in raw form for later use by consumer
	activeFlags: TileActiveFlags;

	// Tile Flags in raw form for later use by consumer
	tileFlags?: TileFlags;

	// For tiles, defines the subtype
	u?: number;
	v?: number;

	// Colors
	color?: number;
	wallColor?: number;

	// Liquid information
	liquidType?: LiquidType;
	liquidAmount?: number;

	// RLE compression
	rle?: number;

	// The tile definition ID, present only for 'foreground' tiles (i.e. not walls)
	tileTypeId?: number;

	// The Wall type definition ID, present only if the tile has a wall
	wallTypeId?: number;

	// Derived types that may be useful for counting, highlighting on a map, etc.
	interestingTileType?: TInterestingTypes;
}
