import { readByte } from "../../bufferReader/readByte";
import { readInt16 } from "../../bufferReader/readInt16";
import { readUInt16 } from "../../bufferReader/readUInt16";
import type { LiquidType } from "../../enums/LiquidType";
import { TileActiveFlags } from "../../enums/TileActiveFlags";
import { TileFlags } from "../../enums/TileFlags";
import type { WorldDataSource } from "../../types/WorldDataSource";
import type { ParseConfig } from "../../types/ParseConfig";
import type { TileData } from "../../types/TileData";
import type { InterestingTileCounts } from "../../types/Worlds/InterestingTiles/InterestingTileCounts";

type DeserializedTile<TInterestingTypes extends number> = {
	tileData: TileData<TInterestingTypes>;
	rle?: number;
};

const hasFlag = (flags: number, mask: number): boolean => {
	return (flags & mask) === mask;
};

/**
 * Read the Tile Flags for a Tile, which come in (up to) 2 bytes.
 *
 * @param {WorldDataSource} worldDataSource
 * @param {number} activeFlags
 *
 * @returns {TileFlags} A number representing the bitwise flags set.
 */
const readTileFlags = (worldDataSource: WorldDataSource, activeFlags: TileActiveFlags): TileFlags | undefined => {
	// If we have Tile Flags at all
	if (hasFlag(activeFlags, TileActiveFlags.TileFlagsExist)) {
		// Read the first type of the file flags
		const lowByte = readByte(worldDataSource);

		// Check to see if High Byte is present
		if (hasFlag(lowByte, TileFlags.HasHighByte)) {
			return lowByte | (readByte(worldDataSource) << 8);
		}

		// No high byte
		return lowByte;
	}

	// Neither high nor low
	return undefined;
};

/**
 * Read the tile type for a Tile.
 *
 * @param {WorldDataSource} worldDataSource
 * @param {number} activeFlags
 *
 * @returns {number | undefined}
 */
const readTileType = (worldDataSource: WorldDataSource, activeFlags: number): number | undefined => {
	// If the appropriate flag is set to enable us to read a type
	if (hasFlag(activeFlags, TileActiveFlags.TileExists)) {
		const lowByte = readByte(worldDataSource);

		// Check if Tile Flags is 2 bytes or just one
		if (hasFlag(activeFlags, TileActiveFlags.TileFlagsHasHighByte)) {
			return lowByte | (readByte(worldDataSource) << 8);
		}

		return lowByte;
	}

	return undefined;
};

/**
 * Active Flags bit[6,7] shift to 0,1 for RLE encoding type
 * 0 = no RLE compression
 * 1 = byte RLE counter
 * 2 = int16 RLE counter
 * 3 = ERROR
 *
 * @param {WorldDataSource} worldDataSource
 * @param {number} activeFlags
 *
 * @return {number | undefined}
 */
const readRLE = (worldDataSource: WorldDataSource, activeFlags: number): number | undefined => {
	const rleStorageType = (activeFlags & 192) >> 6;

	// Read RLE distance
	if (rleStorageType === 1) {
		return readByte(worldDataSource);
	}

	if (rleStorageType === 2) {
		return readUInt16(worldDataSource);
	}

	return undefined;
};

export const deserializeTile = <TInterestingTypes extends number>(worldDataSource: WorldDataSource, tileFrameImportance: boolean[], interestingTileCounts: InterestingTileCounts<TInterestingTypes>, interestingTileTypeEvaluator: ParseConfig<TInterestingTypes>["interestingTileTypeEvaluator"]): Readonly<DeserializedTile<TInterestingTypes>> => {
	const activeFlags = readByte(worldDataSource) as TileActiveFlags;
	const tileFlags = readTileFlags(worldDataSource, activeFlags);
	const tileData: TileData<TInterestingTypes> = {
		activeFlags,
		tileFlags,
	};

	// Read the tile type
	tileData.tileTypeId = readTileType(worldDataSource, activeFlags);

	// If we have a type, and it is marked as important, read the U/V
	if (tileData.tileTypeId !== undefined && tileFrameImportance[tileData.tileTypeId]) {
		tileData.u = readInt16(worldDataSource);
		tileData.v = readInt16(worldDataSource);
	}

	// Sometimes we want to flag notable tiles for rendering/searching later on
	if (tileData.tileTypeId !== undefined) {
		tileData.interestingTileType = interestingTileTypeEvaluator(tileData);
	}

	// Read tile colour (only if tile flags are set and have the appropriate flag)
	if (tileData.tileFlags !== undefined && hasFlag(tileData.tileFlags, TileFlags.TileIsPainted)) {
		tileData.color = readByte(worldDataSource);
	}

	// Read wall if present
	if (hasFlag(activeFlags, TileActiveFlags.WallExists)) {
		tileData.wallTypeId = readByte(worldDataSource);

		// Read wall color (only if tile flags are set and have the appropriate flag)
		if (tileData.tileFlags !== undefined && hasFlag(tileData.tileFlags, TileFlags.WallIsPainted)) {
			tileData.wallColor = readByte(worldDataSource);
		}
	}

	// Check for liquids, grab the bit[3] and bit[4], shift them to the 0 and 1 bits
	const liquidType = ((activeFlags & TileActiveFlags.LiquidTypeHoney) >> 3) as LiquidType;
	if (liquidType > 0) {
		tileData.liquidAmount = readByte(worldDataSource);
		tileData.liquidType = liquidType;
	}

	// If wall type has a high byte
	if (tileData.tileFlags !== undefined && hasFlag(tileData.tileFlags, TileFlags.WallIdHasHighByte)) {
		tileData.wallTypeId = tileData.wallTypeId === undefined ? undefined : tileData.wallTypeId | (readByte(worldDataSource) << 8);
	}

	// Read the RLE
	tileData.rle = readRLE(worldDataSource, activeFlags);

	// Handle counts
	if (tileData.interestingTileType !== undefined) {
		const existingCount = interestingTileCounts.get(tileData.interestingTileType) ?? 0;
		interestingTileCounts.set(tileData.interestingTileType, existingCount + 1 + (tileData.rle ?? 0));
	}

	return {
		tileData,
		rle: tileData.rle,
	};
};
