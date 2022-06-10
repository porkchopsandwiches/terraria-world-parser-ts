import { readInt32 } from "../../worldDataSource/readInt32";
import { readString } from "../../worldDataSource/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "bestiarySeen">>;

export const parseBestiarySeen: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	if (sourceWorld.version >= 210) {
		const world: OutputWorld = {
			bestiarySeen: [],
		};
		const npcCount = readInt32(worldDataSource);
		for (let counter = 0; counter < npcCount; ++counter) {
			const npc = readString(worldDataSource);
			world.bestiarySeen?.push(npc);
		}

		return world;
	}

	return {};
};
