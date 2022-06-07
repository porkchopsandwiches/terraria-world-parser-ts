export enum TileActiveFlags {
	TileFlagsExist = 1 << 0,
	TileExists = 1 << 1,
	WallExists = 1 << 2,
	LiquidTypeWater = 1 << 3,
	LiquidTypeLava = 1 << 4,
	LiquidTypeHoney = LiquidTypeWater | LiquidTypeLava,
	TileFlagsHasHighByte = 1 << 5,
	RleFieldLength1 = 1 << 6,
	RleFieldLength2 = 1 << 7,
}
