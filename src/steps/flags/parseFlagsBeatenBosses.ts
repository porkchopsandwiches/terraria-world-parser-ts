import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "beatBoss1" | "beatBoss2" | "beatBoss3" | "beatQueenBee" | "beatMechBoss1" | "beatMechBoss2" | "beatMechBoss3" | "beatMechBossAny" | "beatPlantBoss" | "beatGolemBoss"> & Partial<Pick<WorldCurrent, "beatSlimeKingBoss">>;

export const parseFlagsBeatenBosses: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {
		beatBoss1: readBoolean(worldDataSource),
		beatBoss2: readBoolean(worldDataSource),
		beatBoss3: readBoolean(worldDataSource),
		beatQueenBee: readBoolean(worldDataSource),
		beatMechBoss1: readBoolean(worldDataSource),
		beatMechBoss2: readBoolean(worldDataSource),
		beatMechBoss3: readBoolean(worldDataSource),
		beatMechBossAny: readBoolean(worldDataSource),
		beatPlantBoss: readBoolean(worldDataSource),
		beatGolemBoss: readBoolean(worldDataSource),
	};

	if (sourceWorld.version >= 118) {
		world.beatSlimeKingBoss = readBoolean(worldDataSource);
	}

	return world;
};
