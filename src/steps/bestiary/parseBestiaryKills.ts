import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "bestiaryKills">>;

export const parseBestiaryKills: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	if (sourceWorld.version >= 210) {
		const world: OutputWorld = {
			bestiaryKills: [],
		};
		const npcCount = readInt32(worldDataSource);
		for (let counter = 0; counter < npcCount; ++counter) {
			const npc = readString(worldDataSource);
			const killCount = readInt32(worldDataSource);

			world.bestiaryKills?.push({
				npc,
				killCount,
			});
		}

		return world;
	}

	return {};
};
