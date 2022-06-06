import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "beatBoss1" | "beatBoss2" | "beatBoss3" | "beatQueenBee" | "beatMechBoss1" | "beatMechBoss2" | "beatMechBoss3" | "beatMechBossAny" | "beatPlantBoss" | "beatGolemBoss"> & Partial<Pick<WorldCurrent, "beatSlimeKingBoss">>;

export const parseFlagsBeatenBosses: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {} as never;
	world.beatBoss1 = readBoolean(byteBuffer);
	world.beatBoss2 = readBoolean(byteBuffer);
	world.beatBoss3 = readBoolean(byteBuffer);
	world.beatQueenBee = readBoolean(byteBuffer);
	world.beatMechBoss1 = readBoolean(byteBuffer);
	world.beatMechBoss2 = readBoolean(byteBuffer);
	world.beatMechBoss3 = readBoolean(byteBuffer);
	world.beatMechBossAny = readBoolean(byteBuffer);
	world.beatPlantBoss = readBoolean(byteBuffer);
	world.beatGolemBoss = readBoolean(byteBuffer);

	if (sourceWorld.version >= 118) {
		world.beatSlimeKingBoss = readBoolean(byteBuffer);
	}
	return world;
};
