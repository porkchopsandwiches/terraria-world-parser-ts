import { has } from "ramda";
import { OreType } from "../enums/OreType";
import type { Tile } from "../types/Tile";

export const mapTileToOre = (tile: Tile): OreType | undefined => {
	if (tile.defId && has(tile.defId.toString(), OreType)) {
		return tile.defId as OreType;
	}
	return;
};
