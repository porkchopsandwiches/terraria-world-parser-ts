export enum TileFlags {
	// Low byte
	HasHighByte = 1,
	HasRedWire = 1 << 1,
	HasBlueWire = 1 << 2,
	HasGreenWire = 1 << 3,
	HasTileSlope1 = 1 << 4,
	HasTileSlope2 = 1 << 5,
	HasTileSlope3 = 1 << 6,
	Unused1 = 1 << 7,

	// High byte
	Unused2 = 1 << 8,
	HasActuator = 1 << 9,
	IsActuated = 1 << 10,
	TileIsPainted = 1 << 11,
	WallIsPainted = 1 << 12,
	HasYellowWire = 1 << 13,
	WallIdHasHighByte = 1 << 14,
}
