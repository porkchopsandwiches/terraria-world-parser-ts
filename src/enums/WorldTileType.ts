export enum WorldTileType {
	Weed = 3,
	Torch = 4,
	Heart = 12,
	WoodPlatform = 19,
	Chest = 21,
	Altar = 26,
	Book = 50,
	Sign = 55,

	// Map Gem types so we can link their <var> sub-types to the matching <tile> when reading the map data
	Sapphire = 63,
	Ruby = 64,
	Emerald = 65,
	Topaz = 66,
	Amethyst = 67,
	Diamond = 68,

	GraveMarker = 85,
	Dresser = 88,
	Statue = 105,
	DartTrap = 137,
	Timer = 144,

	Gem = 178,
	SmallRubble = 185,
	LargeRubble = 186,
	LargeRubble2 = 187,

	Campfire = 215,
	HeartFruit = 236,
	DyeFlowers = 227,

	Seashell = 324,

	CoinPileCopper = 330,
	CoinPileSilver = 331,
	CoinPileGold = 332,
	CoinPilePlatinum = 333,
}
