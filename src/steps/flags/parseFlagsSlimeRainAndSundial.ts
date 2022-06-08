import { readByte } from "../../bufferReader/readByte";
import { readFloat64 } from "../../bufferReader/readFloat64";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "slimeRainTime" | "sundialCooldown">>;

export const parseFlagsSlimeRainAndSundial: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 118) {
		world.slimeRainTime = readFloat64(worldDataSource);
	}

	if (sourceWorld.version >= 113) {
		world.sundialCooldown = readByte(worldDataSource);
	}

	return world;
};
