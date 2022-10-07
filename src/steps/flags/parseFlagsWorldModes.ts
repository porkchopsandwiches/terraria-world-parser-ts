import { readBoolean } from "../../worldDataSource/readBoolean";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readInt32s } from "../../worldDataSource/readInt32s";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "expertMode" | "creationTime" | "isGetGoodWorld" | "masterMode" | "gameMode" | "isDrunkWorld" | "isTenthAnniversaryWorld" | "isDontStarveWorld" | "isNotTheBeesWorld" | "isRemixWorld" | "isNoTrapsWorld" | "isZenithWorld">>;

export const parseFlagsWorldModes: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 209) {
		world.gameMode = readInt32(worldDataSource);
		if (sourceWorld.version >= 222) {
			world.isDrunkWorld = readBoolean(worldDataSource);
		}

		if (sourceWorld.version >= 227) {
			world.isGetGoodWorld = readBoolean(worldDataSource);
		}

		if (sourceWorld.version >= 238) {
			world.isTenthAnniversaryWorld = readBoolean(worldDataSource);
		}
	} else {
		if (sourceWorld.version >= 112) {
			world.expertMode = readBoolean(worldDataSource);
		}

		if (sourceWorld.version >= 208) {
			world.masterMode = readBoolean(worldDataSource);
		}
	}

	if (sourceWorld.version >= 239) {
		world.isDontStarveWorld = readBoolean(worldDataSource);
	}

	if (sourceWorld.version >= 241) {
		world.isNotTheBeesWorld = readBoolean(worldDataSource);
	}

	if (sourceWorld.version >= 249) {
		world.isRemixWorld = readBoolean(worldDataSource);
	}

	if (sourceWorld.version >= 266) {
		world.isNoTrapsWorld = readBoolean(worldDataSource);
	}

	if (sourceWorld.version >= 267) {
		world.isZenithWorld = readBoolean(worldDataSource);
	}

	if (sourceWorld.version >= 141) {
		world.creationTime = readInt32s(2, worldDataSource);
	}

	return world;
};
