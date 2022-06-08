import type { ParseConfig } from "../../types/ParseConfig";
import type { ParseStep } from "../../types/ParseStep";
import type { TileData } from "../../types/TileData";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";
import { deserializeTile } from "./deserializeTile";

type InputWorld = Pick<WorldCurrent, "width" | "height" | "tileFrameImportance">;
type OutputWorld<TInterestingTypes extends number> = Pick<WorldCurrent<TInterestingTypes>, "tiles" | "interestingTileCounts">;

export const parseTilesFactory = <TInterestingTypes extends number>(interestingTileTypeEvaluator: ParseConfig<TInterestingTypes>["interestingTileTypeEvaluator"]): ParseStep<InputWorld, OutputWorld<TInterestingTypes>> => {
	return async (byteBuffer, sourceWorld) => {
		const world: OutputWorld<TInterestingTypes> = { tiles: [], interestingTileCounts: new Map() };

		for (let x = 0; x < sourceWorld.width; x++) {

			const columnTiles: TileData<TInterestingTypes>[] = [];
			for (let y = 0; y < sourceWorld.height; y++) {
				const { tileData, rle: initialRle } = deserializeTile(byteBuffer, sourceWorld.tileFrameImportance, world.interestingTileCounts, interestingTileTypeEvaluator);
				columnTiles[y] = tileData;
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

					columnTiles[y] = tileData;
					rle--;
				}
			}
			world.tiles[x] = columnTiles;
		}


		return world;
	};
};


