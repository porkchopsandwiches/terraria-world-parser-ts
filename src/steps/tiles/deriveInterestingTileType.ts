import { InterestingTileTypes } from "../../enums/InterestingTileTypes";
import type { TileData } from "../../types/TileData";

enum TileType {
	Gem = 178,
	SmallRubble = 185,
	LargeRubble = 186,
	LargeRubble2 = 187,
}

// Basic Type Type IDs that correspond directly to an interesting type
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

export const deriveInterestingTileType = (tileData: TileData<InterestingTileTypes>): InterestingTileTypes | undefined => {
	const { tileTypeId, u, v } = tileData;
	if (tileTypeId === TileType.SmallRubble && u !== undefined && v !== undefined) {
		if (u % 36 === 0 && v === 18) {
			const subType = u / 36;
			if (subType === 16) {
				return InterestingTileTypes.CoinPileCopper;
			} if (subType === 17) {
				return InterestingTileTypes.CoinPileSilver;
			} if (subType === 18) {
				return InterestingTileTypes.CoinPileGold;
			} if (subType === 19) {
				return InterestingTileTypes.Amethyst;
			} if (subType === 20) {
				return InterestingTileTypes.Topaz;
			} if (subType === 21) {
				return InterestingTileTypes.Sapphire;
			} if (subType === 22) {
				return InterestingTileTypes.Emerald;
			} if (subType === 23) {
				return InterestingTileTypes.Ruby;
			} if (subType === 24) {
				return InterestingTileTypes.Diamond;
			}
		}
	} else if (tileTypeId === TileType.LargeRubble && u !== undefined && v !== undefined) {
		if (u % 54 === 0 && v === 0) {
			const subType = u / 54;

			if (subType === 16 || subType === 17) {
				return InterestingTileTypes.CoinPileCopper;
			} if (subType === 18 || subType === 19) {
				return InterestingTileTypes.CoinPileSilver;
			} if (subType === 20 || subType === 21) {
				return InterestingTileTypes.CoinPileGold;
			}
		}
	} else if (tileTypeId === TileType.LargeRubble2 && u !== undefined && v !== undefined) {
		if (u % 54 === 0 && v === 0) {
			const subType = u / 54;
			if (subType === 17) {
				return InterestingTileTypes.EnchantedSword;
			}
		}
	} else if (tileTypeId === TileType.Gem && u !== undefined) {
		const subType = u / 18;
		if (subType === 0) {
			return InterestingTileTypes.Amethyst;
		} else if (subType === 1) {
			return InterestingTileTypes.Topaz;
		} else if (subType === 2) {
			return InterestingTileTypes.Sapphire;
		} else if (subType === 3) {
			return InterestingTileTypes.Emerald;
		} else if (subType === 4) {
			return InterestingTileTypes.Ruby;
		} else if (subType === 5) {
			return InterestingTileTypes.Diamond;
		} else if (subType === 6) {
			return InterestingTileTypes.Amber;
		}
	}

	// Otherwise, see if the type itself is interesting
	return tileTypeId && fixedInterestingTileTypeIds.get(tileTypeId);
};
