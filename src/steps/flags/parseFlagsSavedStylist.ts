import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV104 } from "../../types/Worlds/WorldV104";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV104, "savedStylist">>;

export const parseFlagsSavedStylist: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 104) {
		world.savedStylist = readBoolean(byteBuffer);
	}
	return world;
};
