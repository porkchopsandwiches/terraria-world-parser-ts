import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "bestiarySeen">>;

export const parseBestiarySeen: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	if (sourceWorld.version >= 210) {
		const world: OutputWorld = {
			bestiarySeen: [],
		};
		const npcCount = readInt32(byteBuffer);
		for (let counter = 0; counter < npcCount; ++counter) {
			const npc = readString(byteBuffer);
			world.bestiarySeen?.push(npc);
		}
		return world;
	}

	return {};
};
