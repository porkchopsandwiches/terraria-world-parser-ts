import type { ParseStep } from "../../types/ParseStep";
import type { Tile } from "../../types/Tile";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";
import { deserializeTile } from "./deserializeTile";

type InputWorld = Pick<WorldCurrent, "width" | "height" | "tileFrameImportance">;
type OutputWorld = Pick<WorldCurrent, "tiles" | "ores">;

export const parseTiles: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = { tiles: [], ores: {} };

	for (let x = 0; x < sourceWorld.width; x++) {

		const columnTiles: Tile[] = [];
		for (let y = 0; y < sourceWorld.height; y++) {
			const deserialized = deserializeTile(byteBuffer, sourceWorld.tileFrameImportance, world.ores);
			columnTiles[y] = deserialized.tile;

			const initialRle = deserialized.rle;

			while (deserialized.rle > 0) {
				y++;
				if (y > sourceWorld.height) {
					throw new Error(
						"Invalid tile data: RLE Compression outside bounds [" +
						x +
						"," +
						y +
						"], current RLE: " +
						deserialized.rle +
						"; initial RLE: " +
						initialRle,
					);
				} else {
					columnTiles[y] = deserialized.tile;
					deserialized.rle--;
				}
			}
		}
		world.tiles[x] = columnTiles;
	}


	return world;
};
