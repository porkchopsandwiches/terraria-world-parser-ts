import { readByte } from "../../bufferReader/readByte";
import { readFloat64 } from "../../bufferReader/readFloat64";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV147 } from "../../types/Worlds/WorldV147";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV147, "slimeRainTime" | "sundialCooldown">>;

export const parseFlagsSlimeRainAndSundial: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 118) {
		world.slimeRainTime = readFloat64(byteBuffer);
	}

	if (sourceWorld.version >= 113) {
		world.sundialCooldown = readByte(byteBuffer);
	}

	return world;
};
