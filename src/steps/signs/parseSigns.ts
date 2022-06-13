import { readCoord32 } from "../../worldDataSource/readCoord32";
import { readInt16 } from "../../worldDataSource/readInt16";
import { readString } from "../../worldDataSource/readString";
import type { Coordinate } from "../../types/Coordinate";
import type { ParseStep } from "../../types/ParseStep";
import type { Sign } from "../../types/Sign";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "tiles">;
type OutputWorld = Pick<WorldCurrent, "signs">;

const signFactory = (label: string, coord: Coordinate): Sign => {
	return {
		coord,
		label,
	};
};

export const parseSigns: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
	const world: OutputWorld = {
		signs: [],
	};

	const totalSigns = readInt16(worldDataSource);
	for (let index = 0; index < totalSigns; ++index) {
		const sign = signFactory(readString(worldDataSource), readCoord32(worldDataSource));
		world.signs.push(sign);
	}

	return world;
};
