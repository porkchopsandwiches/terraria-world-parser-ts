import { readCoord32 } from "../../worldDataSource/readCoord32";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "townManagerRecords">>;

export const parseTownManagerRecords: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	if (sourceWorld.version >= 140) {
		const world: OutputWorld = {
			townManagerRecords: [],
		};
		const roomCount = readInt32(worldDataSource);
		for (let counter = 0; counter < roomCount; ++counter) {
			const npcId = readInt32(worldDataSource);
			const position = readCoord32(worldDataSource);

			world.townManagerRecords?.push({
				npcId,
				position,
			});
		}

		return world;
	}

	return {};
};
