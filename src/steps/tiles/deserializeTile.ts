import { readByte } from "../../bufferReader/readByte";
import { readInt16 } from "../../bufferReader/readInt16";
import { readUInt16 } from "../../bufferReader/readUInt16";
import { InterestingTileTypes } from "../../enums/InterestingTileTypes";
import type { LiquidType } from "../../enums/LiquidType";
// import { OreType } from "../../enums/OreType";
import { TileActiveFlags } from "../../enums/TileActiveFlags";
import { TileFlags } from "../../enums/TileFlags";
import { WorldTileType } from "../../enums/WorldTileType";
import type { ByteBuffer } from "../../types/ByteBuffer";
import type { TileData } from "../../types/TileData";
import type { InterestingTileCounts } from "../../types/Worlds/InterestingTiles/InterestingTileCounts";

type DeserializedTile = {
	tileData: TileData;
	rle?: number;
};

type TileDeserializer = (
	byteBuffer: ByteBuffer,
	tileFrameImportance: boolean[],
	interestingTileCounts: InterestingTileCounts
) => Readonly<DeserializedTile>;

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

const hasFlag = (flags: number, mask: number): boolean => {
	return (flags & mask) === mask;
};

/**
 * Read the Tile Flags for a Tile, which come in (up to) 2 bytes.
 *
 * @param {ByteBuffer} byteBuffer
 * @param {number} activeFlags
 *
 * @returns {TileFlags} A number representing the bitwise flags set.
 */
const readTileFlags = (byteBuffer: ByteBuffer, activeFlags: TileActiveFlags): TileFlags | undefined => {

	// If we have Tile Flags at all
	if (hasFlag(activeFlags, TileActiveFlags.TileFlagsExist)) {

		// Read the first type of the file flags
		const lowByte = readByte(byteBuffer);

		// Check to see if High Byte is present
		if (hasFlag(lowByte, TileFlags.HasHighByte)) {
			return lowByte | (readByte(byteBuffer) << 8);
		}

		// No high byte
		return lowByte;
	}

	// Neither high nor low
	return;
};

/**
 * Read the tile type for a Tile.
 *
 * @param {ByteBuffer} byteBuffer
 * @param {number} activeFlags
 *
 * @returns {number | undefined}
 */
const readTileType = (byteBuffer: ByteBuffer, activeFlags: number): number | undefined => {

	// If the appropriate flag is set to enable us to read a type
	if (hasFlag(activeFlags, TileActiveFlags.TileExists)) {
		const lowByte = readByte(byteBuffer);

		// Check if Tile Flags is 2 bytes or just one
		if (hasFlag(activeFlags, TileActiveFlags.TileFlagsHasHighByte)) {
			return lowByte | (readByte(byteBuffer) << 8);
		}

		return lowByte;
	}
	return;
};

type MinimumTileDataForDerivingInterestingType = Required<Pick<TileData, "tileTypeId"> & Pick<TileData, "u" | "v">>;

const deriveInterestingTileType = (tileData: MinimumTileDataForDerivingInterestingType): InterestingTileTypes | undefined => {
	const { tileTypeId, u, v } = tileData;
	if (tileTypeId === WorldTileType.SmallRubble) {
		if (u % 36 === 0 && v === 18) {
			const subType = u / 36;
			if (subType === 16) {
				return InterestingTileTypes.CoinPileCopper;
			} else if (subType === 17) {
				return InterestingTileTypes.CoinPileSilver;
			} else if (subType === 18) {
				return InterestingTileTypes.CoinPileGold;
			} else if (subType === 19) {
				return InterestingTileTypes.Amethyst;
			} else if (subType === 20) {
				return InterestingTileTypes.Topaz;
			} else if (subType === 21) {
				return InterestingTileTypes.Sapphire;
			} else if (subType === 22) {
				return InterestingTileTypes.Emerald;
			} else if (subType === 23) {
				return InterestingTileTypes.Ruby;
			} else if (subType === 24) {
				return InterestingTileTypes.Diamond;
			}
		}
	} else if (tileTypeId === WorldTileType.LargeRubble) {
		if (u % 54 === 0 && v === 0) {
			const subType = u / 54;

			if (subType === 16 || subType === 17) {
				return InterestingTileTypes.CoinPileCopper;
			} else if (subType === 18 || subType === 19) {
				return InterestingTileTypes.CoinPileSilver;
			} else if (subType === 20 || subType === 21) {
				return InterestingTileTypes.CoinPileGold;
			}
		}
	} else if (tileTypeId === WorldTileType.LargeRubble2) {
		if (u % 54 === 0 && v === 0) {
			const subType = u / 54;
			if (subType === 17) {
				return InterestingTileTypes.EnchantedSword;
			}
		}
	} else if (tileTypeId === WorldTileType.Gem) {
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
	return fixedInterestingTileTypeIds.get(tileTypeId);
};

/**
 * Active Flags bit[6,7] shift to 0,1 for RLE encoding type
 * 0 = no RLE compression
 * 1 = byte RLE counter
 * 2 = int16 RLE counter
 * 3 = ERROR
 *
 * @param {ByteBuffer} byteBuffer
 * @param {number} activeFlags
 *
 * @return {number | undefined}
 */
const readRLE = (byteBuffer: ByteBuffer, activeFlags: number): number | undefined => {
	const rleStorageType = (activeFlags & 192) >> 6;

	// read RLE distance
	if (rleStorageType === 1) {
		return readByte(byteBuffer);
	} else if (rleStorageType === 2) {
		return readUInt16(byteBuffer);
	}

	return;
};

export const deserializeTile: TileDeserializer = (byteBuffer, tileFrameImportance, interestingTileCounts) => {
	const activeFlags = readByte(byteBuffer) as TileActiveFlags;
	const tileFlags = readTileFlags(byteBuffer, activeFlags);
	const tileData: TileData = {
		activeFlags,
		tileFlags,
	};

	// Read the tile type
	tileData.tileTypeId = readTileType(byteBuffer, activeFlags);

	// If we have a type, and it is marked as important, read the U/V
	if (tileData.tileTypeId !== undefined && tileFrameImportance[tileData.tileTypeId]) {
		tileData.u = readInt16(byteBuffer);
		tileData.v = readInt16(byteBuffer);
	}

	// Sometimes we want to flag notable tiles for rendering/searching later on
	if (tileData.tileTypeId !== undefined) {
		tileData.interestingTileType = deriveInterestingTileType(tileData as MinimumTileDataForDerivingInterestingType);
	}

	// Read tile colour (only if tile flags are set and have the appropriate flag)
	if (tileData.tileFlags !== undefined && hasFlag(tileData.tileFlags, TileFlags.TileIsPainted)) {
		tileData.color = readByte(byteBuffer);
	}

	// Read wall if present
	if (hasFlag(activeFlags, TileActiveFlags.WallExists)) {
		tileData.wallTypeId = readByte(byteBuffer);

		// Read wall color (only if tile flags are set and have the appropriate flag)
		if (tileData.tileFlags !== undefined && hasFlag(tileData.tileFlags, TileFlags.WallIsPainted)) {
			tileData.wallColor = readByte(byteBuffer);
		}
	}

	// check for liquids, grab the bit[3] and bit[4], shift them to the 0 and 1 bits
	const liquidType = (activeFlags & TileActiveFlags.LiquidTypeHoney) >> 3 as LiquidType;
	if (liquidType > 0) {
		tileData.liquidAmount = readByte(byteBuffer);
		tileData.liquidType = liquidType;
	}

	// If wall type has a high byte
	if (tileData.tileFlags !== undefined && hasFlag(tileData.tileFlags, TileFlags.WallIdHasHighByte)) {
		tileData.wallTypeId = tileData.wallTypeId !== undefined ? tileData.wallTypeId | (readByte(byteBuffer) << 8) : undefined;
	}

	// Read the RLE
	tileData.rle = readRLE(byteBuffer, activeFlags);

	// Handle counts
	if (tileData.interestingTileType !== undefined) {
		const existingCount = interestingTileCounts.get(tileData.interestingTileType) || 0;
		interestingTileCounts.set(tileData.interestingTileType, existingCount + 1 + (tileData.rle || 0));
	}

	return {
		tileData,
		rle: tileData.rle,
	};
};
