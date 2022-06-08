import { InterestingTileTypes } from "../../enums/InterestingTileTypes";
import type { TileData } from "../../types/TileData";

enum TileType {
	Gem = 178,
	SmallRubble = 185,
	LargeRubble = 186,
	LargeRubble2 = 187,
}

// Basic Tile Type IDs that correspond directly to an interesting type
const fixedInterestingTileTypeIds = new Map([
	// Misc
	[4, InterestingTileTypes.Torch],
	[12, InterestingTileTypes.HeartStone],
	[21, InterestingTileTypes.Chest],
	[26, InterestingTileTypes.Altar],
	[105, InterestingTileTypes.Statue],
	[85, InterestingTileTypes.GraveMarker],
	[55, InterestingTileTypes.Sign],
	[215, InterestingTileTypes.Campfire],
	[236, InterestingTileTypes.HeartFruit],
	[227, InterestingTileTypes.DyeFlowers],
	[50, InterestingTileTypes.Book],
	[137, InterestingTileTypes.DartTrap],
	[144, InterestingTileTypes.Timer],
	[324, InterestingTileTypes.Seashell],

	// Gems
	[63, InterestingTileTypes.Sapphire],
	[64, InterestingTileTypes.Ruby],
	[65, InterestingTileTypes.Emerald],
	[66, InterestingTileTypes.Topaz],
	[67, InterestingTileTypes.Amethyst],
	[68, InterestingTileTypes.Diamond],

	// Ores
	[7, InterestingTileTypes.Copper],
	[166, InterestingTileTypes.Tin],
	[6, InterestingTileTypes.Iron],
	[167, InterestingTileTypes.Lead],
	[9, InterestingTileTypes.Silver],
	[168, InterestingTileTypes.Tungsten],
	[8, InterestingTileTypes.Gold],
	[169, InterestingTileTypes.Platinum],
	[37, InterestingTileTypes.Meteorite],
	[204, InterestingTileTypes.Crimtane],
	[22, InterestingTileTypes.Demonite],
	[211, InterestingTileTypes.Chlorophyte],
	[107, InterestingTileTypes.Cobalt],
	[108, InterestingTileTypes.Mythril],
	[111, InterestingTileTypes.Adamantite],
	[221, InterestingTileTypes.Palladium],
	[222, InterestingTileTypes.Orichalcum],
	[223, InterestingTileTypes.Titanium],

	// Coin piles
	[330, InterestingTileTypes.CoinPileCopper],
	[331, InterestingTileTypes.CoinPileSilver],
	[332, InterestingTileTypes.CoinPileGold],
	[333, InterestingTileTypes.CoinPilePlatinum],
]);

const deriveSmallRubbleInterestingType = (u?: number, v?: number): InterestingTileTypes | undefined => {
	if (u === undefined || v === undefined || u % 36 !== 0 || v !== 18) {
		return undefined;
	}

	const subType = u / 36;
	switch (subType) {
		case 16:
			return InterestingTileTypes.CoinPileCopper;
		case 17:
			return InterestingTileTypes.CoinPileSilver;
		case 18:
			return InterestingTileTypes.CoinPileGold;
		case 19:
			return InterestingTileTypes.Amethyst;
		case 20:
			return InterestingTileTypes.Topaz;
		case 21:
			return InterestingTileTypes.Sapphire;
		case 22:
			return InterestingTileTypes.Emerald;
		case 23:
			return InterestingTileTypes.Ruby;
		case 24:
			return InterestingTileTypes.Diamond;
		default:
			return undefined;
	}
};

const deriveLargeRubbleInterestingType = (u?: number, v?: number): InterestingTileTypes | undefined => {
	if (u === undefined || v === undefined || u % 54 !== 0 || v !== 0) {
		return undefined;
	}

	const subType = u / 54;
	switch (subType) {
		case 16:
		case 17:
			return InterestingTileTypes.CoinPileCopper;
		case 18:
		case 19:
			return InterestingTileTypes.CoinPileSilver;
		case 20:
		case 21:
			return InterestingTileTypes.CoinPileGold;
		default:
			return undefined;
	}
};

const deriveLargeRubble2InterestingType = (u?: number, v?: number): InterestingTileTypes | undefined => {
	if (u === undefined || v === undefined || u % 54 !== 0 || v !== 0) {
		return undefined;
	}

	const subType = u / 54;
	if (subType === 17) {
		return InterestingTileTypes.EnchantedSword;
	}

	return undefined;
};

const deriveGemInterestingType = (u?: number): InterestingTileTypes | undefined => {
	if (u === undefined) {
		return undefined;
	}

	const subType = u / 18;
	switch (subType) {
		case 0:
			return InterestingTileTypes.Amethyst;
		case 1:
			return InterestingTileTypes.Topaz;
		case 2:
			return InterestingTileTypes.Sapphire;
		case 3:
			return InterestingTileTypes.Emerald;
		case 4:
			return InterestingTileTypes.Ruby;
		case 5:
			return InterestingTileTypes.Diamond;
		case 6:
			return InterestingTileTypes.Amber;
		default:
			return undefined;
	}
};

export const deriveInterestingTileType = (tileData: TileData<InterestingTileTypes>): InterestingTileTypes | undefined => {
	const { tileTypeId, u, v } = tileData;

	switch (tileTypeId) {
		case TileType.SmallRubble:
			return deriveSmallRubbleInterestingType(u, v);
		case TileType.LargeRubble:
			return deriveLargeRubbleInterestingType(u, v);
		case TileType.LargeRubble2:
			return deriveLargeRubble2InterestingType(u, v);
		case TileType.Gem:
			return deriveGemInterestingType(u);
		default:
			return tileTypeId && fixedInterestingTileTypeIds.get(tileTypeId);
	}
};
