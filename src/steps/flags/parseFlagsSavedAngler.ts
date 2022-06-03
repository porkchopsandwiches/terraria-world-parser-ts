import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV099 } from "../../types/Worlds/WorldV099";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV099, "savedAngler">>;

export const parseFlagsSavedAngler: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 99) {
		world.savedAngler = readBoolean(byteBuffer);
	}
	return world;
};
