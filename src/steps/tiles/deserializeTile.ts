import { has } from "ramda";
import { readByte } from "../../bufferReader/readByte";
import { readInt16 } from "../../bufferReader/readInt16";
import { readUInt16 } from "../../bufferReader/readUInt16";
import { WorldTileType } from "../../enums/WorldTileType";
import { mapTileToOre } from "../../ores/mapTileToOre";
import type { ByteBuffer } from "../../types/ByteBuffer";
import type { Tile } from "../../types/Tile";
import type { OreCounts } from "../../types/Worlds/Ores/OreCounts";

type DeserializedTile = {
	tile: Tile;
	rle?: number;
};

type TileDeserializer = (
	byteBuffer: ByteBuffer,
	tileFrameImportance: boolean[],
	oreCounts: OreCounts,
) => DeserializedTile;


/**
 * Read the Tile Flags for a Tile, which come in (up to) 2 bytes.
 *
 * @param {ByteBuffer} byteBuffer
 * @param {number} activeFlags
 *
 * @returns {[number, number]} A tuple of the low byte and high byte. Zeros are returned for either byte if it is not present for this tile.
 */
const readTileFlags = (byteBuffer: ByteBuffer, activeFlags: number): [number, number] => {

	// If the Active Flags Bit 0 is active, we have tile flags
	if ((activeFlags & 1) === 1) {

		// Read the first type of the file flags
		const tileFlags = readByte(byteBuffer);

		// Check Tile Flags bit 0 to see if High Byte is present
		if ((tileFlags & 1) === 1) {
			return [tileFlags, readByte(byteBuffer)];
		}

		// No high byte
		return [tileFlags, 0];
	}

	// Neither high nor low
	return [0, 0]
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
	if ((activeFlags & 2) === 2) {

		// If Active Flags bit 5 is active, we have a little endian int16
		// Otherwise we just have a byte
		if ((activeFlags & 32) === 32) {
			const lowerByte = readByte(byteBuffer);
			const highByte = readByte(byteBuffer);
			return (highByte << 8) | lowerByte;
		} else {
			return readByte(byteBuffer); // tile is byte
		}
	}
	return;
};

const deriveSpecialisedTileType = (tile: Required<Pick<Tile, "u" | "v" | "typeId">>): number | undefined => {
	if (tile.typeId === WorldTileType.SmallRubble) {
		if (tile.u % 36 === 0 && tile.v === 18) {
			const subType = tile.u / 36;
			if (subType === 16) {
				return WorldTileType.CoinPileCopper;
			} else if (subType === 17) {
				return WorldTileType.CoinPileSilver;
			} else if (subType === 18) {
				return WorldTileType.CoinPileGold;
			} else if (subType === 19) {
				return WorldTileType.Amethyst;
			} else if (subType === 20) {
				return WorldTileType.Topaz;
			} else if (subType === 21) {
				return WorldTileType.Sapphire;
			} else if (subType === 22) {
				return WorldTileType.Emerald;
			} else if (subType === 23) {
				return WorldTileType.Ruby;
			} else if (subType === 24) {
				return WorldTileType.Diamond;
			}
		}
	} else if (tile.typeId === WorldTileType.LargeRubble) {
		if (tile.u % 54 === 0 && tile.v === 0) {
			const subType = tile.u / 54;

			if (subType === 16 || subType === 17) {
				return WorldTileType.CoinPileCopper;
			} else if (subType === 18 || subType === 19) {
				return WorldTileType.CoinPileSilver;
			} else if (subType === 20 || subType === 21) {
				return WorldTileType.CoinPileGold;
			}
		}
	} else if (tile.typeId === WorldTileType.LargeRubble2) {
		if (tile.u % 54 === 0 && tile.v === 0) {
			const subType = tile.u / 54;
			if (subType === 17) {
				// tile.type = mapper.data.tiles.getByName("Enchanted Sword").id;
				// @todo how do we want to handle this -- tiles.xml has no <tile> for enchanted sword, but does have a sub <var> entry
			}
		}
	}
	return;
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

export const deserializeTile: TileDeserializer = (byteBuffer, tileFrameImportance, oreCounts) => {

	// let tileType = -1;
	const activeFlags = readByte(byteBuffer);
	const [tileFlagsLowByte, tileFlagsHighByte] = readTileFlags(byteBuffer, activeFlags);
	const tile: Tile = {
		tileFlagsLowByte,
		tileFlagsHighByte,
	};

	// Check Active Flags bit 1 for active tile
	if ((activeFlags & 2) === 2) {
		// Read tile type
		tile.typeId = readTileType(byteBuffer, activeFlags);

		// If we have a type, and it is marked as important
		if (tile.typeId !== undefined && tileFrameImportance[tile.typeId]) {
			tile.u = readInt16(byteBuffer);
			tile.v = readInt16(byteBuffer);

			// Sometimes we want to flag notable tiles
			tile.specialisedTypeId = deriveSpecialisedTileType(tile as Required<Tile>);
		}

		// Check tileFlagsHighByte bit[3] for tile colour
		if ((tileFlagsHighByte & 8) === 8) {
			tile.color = readByte(byteBuffer);
		}
	}

	// Check Active Flags bit 3 for a wall
	if ((activeFlags & 4) === 4) {
		tile.wallTypeId = readByte(byteBuffer);

		// Check Tile Flags High Byte bit 4 to see if there is a wall colour
		if ((tileFlagsHighByte & 16) === 16) {
			tile.wallColor = readByte(byteBuffer);
		}
	}

	// check for liquids, grab the bit[3] and bit[4], shift them to the 0 and 1 bits
	const liquidType = (activeFlags & 24) >> 3;
	if (liquidType !== 0) {
		tile.liquidAmount = readByte(byteBuffer);
		tile.liquidType = liquidType;
	}

	// Read the RLE
	tile.rle = readRLE(byteBuffer, activeFlags);

	// Handle counts
	if (tile.typeId !== undefined) {
		// @todo once we have definition lookup
		if (tile.typeId === WorldTileType.Gem || has(tile.typeId.toString(), WorldTileType)) {
			// const name_and_color = mapTileToNamedColour(tile);
			// world.gems[WorldTileType[<any>name_and_color.name]] += tile.rle + 1;
		}
		// } else if (R.has(tile.def_id.toString(), OreType)) {
		//     world.ores[tile.def_id] += tile.rle + 1;
		// }

		const oreType = mapTileToOre(tile);
		if (oreType !== undefined) {
			if (!oreCounts.hasOwnProperty(oreType)) {
				oreCounts[oreType] = 0;
			}
			(oreCounts[oreType] as number) += (tile.rle || 0) + 1;
		}
	}

	return {
		tile,
		rle: tile.rle,
	};
};
