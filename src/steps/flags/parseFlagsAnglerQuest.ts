import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "anglerQuest">>;

export const parseFlagsAnglerQuest: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 101) {
		world.anglerQuest = readInt32(worldDataSource);
	}

	return world;
};
