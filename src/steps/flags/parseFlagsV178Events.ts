import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "savedBartender" | "invasionTier1" | "invasionTier2" | "invasionTier3">>;

export const parseFlagsV178Events: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 178) {
		world.savedBartender = readBoolean(byteBuffer);
		world.invasionTier1 = readBoolean(byteBuffer);
		world.invasionTier2 = readBoolean(byteBuffer);
		world.invasionTier3 = readBoolean(byteBuffer);
	}

	return world;
};
