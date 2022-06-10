import { readBoolean } from "../../worldDataSource/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "beatBossEyeOfCthulu" | "beatBossEaterOfWorldsOrBrainOfCthulu" | "beatBossSkeletron" | "beatBossQueenBee" | "beatBossTheDestroyer" | "beatBossTheTwins" | "beatBossSkeletronPrime" | "beatBossAnyMechanicalBoss" | "beatBossPlantera" | "beatBossGolem"> & Partial<Pick<WorldCurrent, "beatBossSlimeKing">>;

export const parseFlagsBeatenBosses: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {
		beatBossEyeOfCthulu: readBoolean(worldDataSource),
		beatBossEaterOfWorldsOrBrainOfCthulu: readBoolean(worldDataSource),
		beatBossSkeletron: readBoolean(worldDataSource),
		beatBossQueenBee: readBoolean(worldDataSource),
		beatBossTheDestroyer: readBoolean(worldDataSource),
		beatBossTheTwins: readBoolean(worldDataSource),
		beatBossSkeletronPrime: readBoolean(worldDataSource),
		beatBossAnyMechanicalBoss: readBoolean(worldDataSource),
		beatBossPlantera: readBoolean(worldDataSource),
		beatBossGolem: readBoolean(worldDataSource),
	};

	if (sourceWorld.version >= 118) {
		world.beatBossSlimeKing = readBoolean(worldDataSource);
	}

	return world;
};
