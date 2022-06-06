export type Tile = {

	// Define the sub type
	u?: number;
	v?: number;

	// Colors
	color?: number;
	wallColor?: number;

	// Tile Flags in raw form for later use by consumer
	tileFlagsLowByte: number;
	tileFlagsHighByte: number;

	// Wall type ID if the tile has a wall
	wallTypeId?: number;

	// Liquid information
	liquidType?: number;
	liquidAmount?: number;

	// RLE compression
	rle?: number;

	// The tile definition, present only for 'foreground' tiles (i.e. not walls)
	typeId?: number;

	// Derived types that may be useful for counting, highlighting on a map, etc.
	specialisedTypeId?: number;
}
