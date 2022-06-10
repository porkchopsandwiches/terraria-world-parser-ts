import { readInt32 } from "../../worldDataSource/readInt32";
import { readString } from "../../worldDataSource/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "anglers">>;

export const parseFlagsAnglers: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 95) {
		world.anglers = [];
		const anglerCount = readInt32(worldDataSource);
		for (let index = 0; index < anglerCount; ++index) {
			world.anglers.push(readString(worldDataSource));
		}
	}

	return world;
};
