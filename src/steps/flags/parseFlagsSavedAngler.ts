import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "savedAngler">>;

export const parseFlagsSavedAngler: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 99) {
		world.savedAngler = readBoolean(worldDataSource);
	}

	return world;
};
