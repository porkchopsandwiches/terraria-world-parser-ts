export type Tile = {
	// If true, is a foreground tile
	isActive?: boolean;

	// Define the sub type
	u?: number;
	v?: number;

	// Perhaps for tiles that can be painted by the user?
	color?: number;
	wallColour?: number;

	// Type of brick
	brickStyle?: number;

	// Wall type
	//wall?: IWallDefinition;
	wallId?: number; // Just use this for now, @todo switch to def later?

	// Liquid data
	liquidType?: number;
	liquidAmount?: number;

	// Wire configurations
	wireRed?: boolean;
	wireGreen?: boolean;
	wireBlue?: boolean;

	// Whether this tile acts as an actuator
	isActuator?: boolean;

	// If true, this tile has been made inactive due to an actuator
	isInactive?: boolean;

	rle: number;

	// The tile definition, present only for 'foreground' tiles (i.e. not walls)
	//def?: ITileDefinition;
	defId?: number; // Just use this for now, @todo switch to def later?
}
