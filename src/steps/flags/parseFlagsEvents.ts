import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readFloat64 } from "../../worldDataSource/readFloat64";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "beatClown" | "beatInvasionGoblins" | "beatInvasionFrostLegion" | "beatInvasionPirates" | "shadowOrbSmashed" | "spawnMeteor" | "shadowOrbCount" | "altarCount" | "hardMode" | "invasionDelay" | "invasionSize" | "invasionType" | "invasionX"> & Partial<Pick<WorldCurrent, "afterPartyOfDoom">>;

export const parseFlagsEvents: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {} as never;
	const { version } = sourceWorld;

	world.beatInvasionGoblins = readBoolean(worldDataSource);
	world.beatClown = readBoolean(worldDataSource);
	world.beatInvasionFrostLegion = readBoolean(worldDataSource);
	world.beatInvasionPirates = readBoolean(worldDataSource);

	if (version >= 257) {
		world.afterPartyOfDoom = readBoolean(worldDataSource);
	}

	world.shadowOrbSmashed = readBoolean(worldDataSource);
	world.spawnMeteor = readBoolean(worldDataSource);
	world.shadowOrbCount = readByte(worldDataSource);
	world.altarCount = readInt32(worldDataSource);
	world.hardMode = readBoolean(worldDataSource);
	world.invasionDelay = readInt32(worldDataSource);
	world.invasionSize = readInt32(worldDataSource);
	world.invasionType = readInt32(worldDataSource);
	world.invasionX = readFloat64(worldDataSource);

	return world;
};
