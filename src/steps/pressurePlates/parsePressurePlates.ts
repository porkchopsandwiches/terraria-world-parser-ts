import { readCoord32 } from "../../worldDataSource/readCoord32";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "pressurePlates">>;

export const parsePressurePlates: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	if (sourceWorld.version >= 170) {
		const world: OutputWorld = {
			pressurePlates: [],
		};
		const pressurePlateCount = readInt32(worldDataSource);
		for (let counter = 0; counter < pressurePlateCount; ++counter) {
			const position = readCoord32(worldDataSource);
			world.pressurePlates?.push(position);
		}

		return world;
	}

	return {};
};
