/* eslint-disable prettier/prettier */
export enum TileFlags {
	// 1st byte
	HasHighByte 	= 0b0000_0001,
	HasRedWire		= 0b0000_0010,
	HasBlueWire		= 0b0000_0100,
	HasGreenWire	= 0b0000_1000,
	HasTileSlope1	= 0b0001_0000,
	HasTileSlope2	= 0b0010_0000,
	HasTileSlope3	= 0b0100_0000,
	Unused1			= 0b1000_0000,

	// 2nd byte
	HasThirdByte		= 0b0000_0001_0000_0000,
	HasActuator			= 0b0000_0010_0000_0000,
	IsActuated			= 0b0000_0100_0000_0000,
	TileIsPainted		= 0b0000_1000_0000_0000,
	WallIsPainted		= 0b0001_0000_0000_0000,
	HasYellowWire		= 0b0010_0000_0000_0000,
	WallIdHasHighByte	= 0b0100_0000_0000_0000,
	IsShimmer			= 0b1000_0000_0000_0000,

	// Third byte (v1.4.4+)
	IsInvisibleBlock	= 0b0000_0010_0000_0000_0000_0000,
	IsInvisibleWall		= 0b0000_0100_0000_0000_0000_0000,
	IsFullBrightBlock	= 0b0000_1000_0000_0000_0000_0000,
	IsFullBrightWall	= 0b0001_0000_0000_0000_0000_0000,
}
