import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV178 } from "../../types/Worlds/WorldV178";

type InputWorld = Pick<WorldBase, "version">;
type NewerOutputWorld = Pick<WorldV178, "savedBartender" | "invasionTier1" | "invasionTier2" | "invasionTier3">;
type OutputWorld = Partial<NewerOutputWorld>;

export const parseFlagsV178Events: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	if (sourceWorld.version >= 178) {
		const world: OutputWorld = {};
		world.savedBartender = readBoolean(byteBuffer);
		world.invasionTier1 = readBoolean(byteBuffer);
		world.invasionTier2 = readBoolean(byteBuffer);
		world.invasionTier3 = readBoolean(byteBuffer);
		return world;
	}

	return {};
};
