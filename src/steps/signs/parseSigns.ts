import { readCoord32 } from "../../bufferReader/readCoord32";
import { readInt16 } from "../../bufferReader/readInt16";
import { readString } from "../../bufferReader/readString";
import { WorldTileType } from "../../enums/WorldTileType";
import type { Coordinate } from "../../types/Coordinate";
import type { ParseStep } from "../../types/ParseStep";
import type { Sign } from "../../types/Sign";
import type { Tile } from "../../types/Tile";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "tiles">;
type OutputWorld = Pick<WorldCurrent, "signs">;

const isSign = (type: number): boolean => {
	return type === WorldTileType.Sign || type === WorldTileType.GraveMarker;
};

const signFactory = (label: string, coord: Coordinate): Sign => {
	return {
		coord,
		label,
	};
};

export const parseSigns: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {
		signs: [],
	};

	const totalSigns = readInt16(byteBuffer);
	for (let i = 0; i < totalSigns; ++i) {
		const sign = signFactory(readString(byteBuffer), readCoord32(byteBuffer));

		const tile = sourceWorld.tiles[sign.coord.x]?.[sign.coord.y] as Tile;
		if (tile.typeId !== undefined && isSign(tile.typeId)) {
			world.signs.push(sign);
		}
	}

	return world;
};
