import { has } from "ramda";
import { readByte } from "../../bufferReader/readByte";
import { readInt16 } from "../../bufferReader/readInt16";
import { readUInt16 } from "../../bufferReader/readUInt16";
import { WorldTileType } from "../../enums/WorldTileType";
import { mapTileToOre } from "../../ores/mapTileToOre";
import type { ByteBuffer } from "../../types/ByteBuffer";
import type { Tile } from "../../types/Tile";
import type { OreCounts } from "../../types/Worlds/Ores/OreCounts";
import type { WorldTileProperty } from "../../types/WorldTileProperty";

type DeserializedTile = {
	tile: Tile;
	rle: number;
};

type TileDeserializer = (
	byteBuffer: ByteBuffer,
	tileFrameImportance: boolean[],
	oreCounts: OreCounts,
	// world: Pick<WorldBase, "ores">
) => DeserializedTile;

// @todo What exactly is this supposed to do?
const tileProperties: WorldTileProperty[] = [];

export const deserializeTile: TileDeserializer = (byteBuffer, tileFrameImportance, oreCounts) => {
	const tile: Tile = { rle: 0 };
	let tileType = -1;
	const header1 = readByte(byteBuffer);
	let header2 = 0;
	let header3 = 0;

	// check bit[0] to see if header 2 has data
	if ((header1 & 1) === 1) {
		header2 = readByte(byteBuffer);

		// Check bit[0] to see if header 3 has data
		if ((header2 & 1) === 1) {
			header3 = readByte(byteBuffer);
		}
	}

	// check bit[1] for active tile
	if ((header1 & 2) === 2) {
		tile.isActive = true;

		// Read tile type

		// check bit[5] to see if tile is byte or little endian int16
		if ((header1 & 32) !== 32) {
			tileType = readByte(byteBuffer); // tile is byte
		} else {
			// tile is little endian int 16
			const lowerByte = readByte(byteBuffer);
			tileType = readByte(byteBuffer);
			tileType = (tileType << 8) | lowerByte;
		}

		// read frame UV coordinates
		if (!tileFrameImportance[tileType]) {
			tile.u = -1;
			tile.v = -1;
		} else {
			const u = (tile.u = readInt16(byteBuffer));
			tile.v = readInt16(byteBuffer);

			if (tileType === WorldTileType.SmallRubble) {
				if (u % 36 === 0 && tile.v === 18) {
					const subType = u / 36;
					if (subType === 16) {
						tileType = WorldTileType.CoinPileCopper;
					} else if (subType === 17) {
						tileType = WorldTileType.CoinPileSilver;
					} else if (subType === 18) {
						tileType = WorldTileType.CoinPileGold;
					} else if (subType === 19) {
						tileType = WorldTileType.Amethyst;
					} else if (subType === 20) {
						tileType = WorldTileType.Topaz;
					} else if (subType === 21) {
						tileType = WorldTileType.Sapphire;
					} else if (subType === 22) {
						tileType = WorldTileType.Emerald;
					} else if (subType === 23) {
						tileType = WorldTileType.Ruby;
					} else if (subType === 24) {
						tileType = WorldTileType.Diamond;
					}
				}
			} else if (tileType === WorldTileType.LargeRubble) {
				if (u % 54 === 0 && tile.v === 0) {
					const subType = u / 54;

					if (subType === 16 || subType === 17) {
						tileType = WorldTileType.CoinPileCopper;
					} else if (subType === 18 || subType === 19) {
						tileType = WorldTileType.CoinPileSilver;
					} else if (subType === 20 || subType === 21) {
						tileType = WorldTileType.CoinPileGold;
					}
				}
			} else if (tileType === WorldTileType.LargeRubble2) {
				if (u % 54 === 0 && tile.v === 0) {
					const subType = u / 54;
					if (subType === 17) {
						// tile.type = mapper.data.tiles.getByName("Enchanted Sword").id;
						// @todo how do we want to handle this -- tiles.xml has no <tile> for enchanted sword, but does have a sub <var> entry
					}
				}
			}

			// Reset timers
			if (tileType === WorldTileType.Timer) {
				tile.v = 0;
			}
		}

		// Link the definition // @todo
		// tile.def = definitions.tile_map[tile_type];
		tile.defId = tileType;

		// Check header 3 bit[3] for tile colour
		if ((header3 & 8) === 8) {
			tile.color = readByte(byteBuffer);
		}
	}

	// Read walls

	// Check bit[3] bit for active wall
	if ((header1 & 4) === 4) {
		const wallType = readByte(byteBuffer);
		// tile.wall = definitions.wall_map[wall_type];
		tile.wallId = wallType;

		// Check bit[4] of header 3 to see if there is a wall colour
		if ((header3 & 16) === 16) {
			tile.wallColour = readByte(byteBuffer);
		}
	}

	// check for liquids, grab the bit[3] and bit[4], shift them to the 0 and 1 bits
	const liquidType = (header1 & 24) >> 3;
	if (liquidType !== 0) {
		tile.liquidAmount = readByte(byteBuffer);
		tile.liquidType = liquidType;
	}

	// check if we have data in header2 other than just telling us we have header3
	if (header2 > 1) {
		// check bit[1] for red wire
		if ((header2 & 2) === 2) {
			tile.wireRed = true;
		}
		// check bit[2] for green wire
		if ((header2 & 4) === 4) {
			tile.wireGreen = true;
		}
		// check bit[3] for blue wire
		if ((header2 & 8) === 8) {
			tile.wireBlue = true;
		}

		// grab bits[4, 5, 6] and shift 4 places to 0,1,2. This byte is our brick style
		const brickStyle = (header2 & 112) >> 4;
		// if (brick_style !== 0 && TileProperties.length > tile_type) {
		//     if (!_.has(TileProperties, tile_type)) {
		//         // "tile type not found", tile_type, TileProperties, tile
		//     }
		// }
		if (tile.defId && brickStyle !== 0 && tileProperties.length > tileType && tileProperties[tile.defId]?.is_solid) {
			tile.brickStyle = brickStyle;
		}
	}

	// check if we have data in header3 to process
	if (header3 > 0) {
		// check bit[1] for actuator
		if ((header3 & 2) === 2) {
			tile.isActuator = true;
		}

		// check bit[2] for inactive due to actuator
		if ((header3 & 4) === 4) {
			tile.isInactive = true;
		}
	}

	// get bit[6,7] shift to 0,1 for RLE encoding type
	// 0 = no RLE compression
	// 1 = byte RLE counter
	// 2 = int16 RLE counter
	// 3 = ERROR
	const rleStorageType = (header1 & 192) >> 6;

	// read RLE distance
	let rle = 0;
	if (rleStorageType === 0) {
		// Default
	} else if (rleStorageType !== 1) {
		rle = readUInt16(byteBuffer);
	} else {
		rle = readByte(byteBuffer);
	}

	tile.rle = rle;

	// Handle counts
	if (tile.isActive && tile.defId) {
		// @todo once we have definition lookup
		if (tile.defId === WorldTileType.Gem || has(tile.defId.toString(), WorldTileType)) {
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
			(oreCounts[oreType] as number) += tile.rle + 1;
		}
	}

	return {
		tile,
		rle,
	};
};
