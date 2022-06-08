import { readCoord32 } from "../../bufferReader/readCoord32";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "townManagerRecords">>;

export const parseTownManagerRecords: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	if (sourceWorld.version >= 140) {
		const world: OutputWorld = {
			townManagerRecords: [],
		};
		const roomCount = readInt32(byteBuffer);
		for (let counter = 0; counter < roomCount; ++counter) {
			const npcId = readInt32(byteBuffer);
			const position = readCoord32(byteBuffer);

			world.townManagerRecords?.push({
				npcId,
				position,
			});
		}

		return world;
	}

	return {};
};
