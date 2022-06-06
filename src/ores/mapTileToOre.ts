import { has } from "ramda";
import { OreType } from "../enums/OreType";
import type { Tile } from "../types/Tile";

export const mapTileToOre = (tile: Tile): OreType | undefined => {
	if (tile.typeId !== undefined && has(tile.typeId.toString(), OreType)) {
		return tile.typeId as OreType;
	}
	return;
};
