/* eslint-disable prettier/prettier */
export enum TileActiveFlags {
	TileFlagsExist			= 0b0000_0001,
	TileExists				= 0b0000_0010,
	WallExists				= 0b0000_0100,
	LiquidTypeWater			= 0b0000_1000,
	LiquidTypeLava			= 0b0001_0000,
	LiquidTypeHoney			= 0b0001_1000,
	TileFlagsHasHighByte	= 0b0010_0000,
	RleFieldLength1			= 0b0100_0000,
	RleFieldLength2			= 0b1000_0000,
}
