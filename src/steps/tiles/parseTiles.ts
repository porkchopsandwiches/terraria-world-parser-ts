import type { ParseStep } from "../../types/ParseStep";
import type { Tile } from "../../types/Tile";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";
import { deserializeTile } from "./deserializeTile";

type InputWorld = Pick<WorldCurrent, "width" | "height" | "tileFrameImportance">;
type OutputWorld = Pick<WorldCurrent, "tiles" | "oreCounts">;

export const parseTiles: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = { tiles: [], oreCounts: {} };

	for (let x = 0; x < sourceWorld.width; x++) {

		const columnTiles: Tile[] = [];
		for (let y = 0; y < sourceWorld.height; y++) {
			const { tile, rle: initialRle } = deserializeTile(byteBuffer, sourceWorld.tileFrameImportance, world.oreCounts);
			columnTiles[y] = tile;
			let rle = initialRle || 0;

			while (rle > 0) {
				y++;
				if (y > sourceWorld.height) {
					throw new Error(
						"Invalid tile data: RLE Compression outside bounds [" +
						x +
						"," +
						y +
						"], current RLE: " +
						rle +
						"; initial RLE: " +
						initialRle,
					);
				}

				columnTiles[y] = tile;
				rle--;
			}
		}
		world.tiles[x] = columnTiles;
	}


	return world;
};
