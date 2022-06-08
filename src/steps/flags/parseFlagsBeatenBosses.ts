import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "beatBoss1" | "beatBoss2" | "beatBoss3" | "beatQueenBee" | "beatMechBoss1" | "beatMechBoss2" | "beatMechBoss3" | "beatMechBossAny" | "beatPlantBoss" | "beatGolemBoss"> & Partial<Pick<WorldCurrent, "beatSlimeKingBoss">>;

export const parseFlagsBeatenBosses: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {
		beatBoss1: readBoolean(byteBuffer),
		beatBoss2: readBoolean(byteBuffer),
		beatBoss3: readBoolean(byteBuffer),
		beatQueenBee: readBoolean(byteBuffer),
		beatMechBoss1: readBoolean(byteBuffer),
		beatMechBoss2: readBoolean(byteBuffer),
		beatMechBoss3: readBoolean(byteBuffer),
		beatMechBossAny: readBoolean(byteBuffer),
		beatPlantBoss: readBoolean(byteBuffer),
		beatGolemBoss: readBoolean(byteBuffer),
	};

	if (sourceWorld.version >= 118) {
		world.beatSlimeKingBoss = readBoolean(byteBuffer);
	}

	return world;
};
