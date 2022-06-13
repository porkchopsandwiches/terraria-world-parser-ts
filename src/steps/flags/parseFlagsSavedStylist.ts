import { readBoolean } from "../../worldDataSource/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "savedStylist">>;

export const parseFlagsSavedStylist: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 104) {
		world.savedStylist = readBoolean(worldDataSource);
	}

	return world;
};
