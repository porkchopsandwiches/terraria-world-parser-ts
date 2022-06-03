import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV101 } from "../../types/Worlds/WorldV101";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV101, "anglerQuest">>;

export const parseFlagsAnglerQuest: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 101) {
		world.anglerQuest = readInt32(byteBuffer);
	}
	return world;
};
