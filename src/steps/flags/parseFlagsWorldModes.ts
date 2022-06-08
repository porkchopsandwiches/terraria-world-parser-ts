import { readBoolean } from "../../bufferReader/readBoolean";
import { readInt32 } from "../../bufferReader/readInt32";
import { readInt32s } from "../../bufferReader/readInt32s";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "expertMode" | "creationTime" | "isGetGoodWorld" | "masterMode" | "gameMode" | "isDrunkWorld" | "tenthAnniversaryWorld" | "isDontStarveWorld" | "isNotTheBeesWorld">>;

export const parseFlagsWorldModes: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
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
			world.tenthAnniversaryWorld = readBoolean(worldDataSource);
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

	if (sourceWorld.version >= 141) {
		world.creationTime = readInt32s(2, worldDataSource);
	}

	return world;
};
