import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "anglers">>;

export const parseFlagsAnglers: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};

	if (sourceWorld.version >= 95) {
		world.anglers = [];
		const anglerCount = readInt32(byteBuffer);
		for (let i = 0; i < anglerCount; ++i) {
			world.anglers.push(readString(byteBuffer));
		}
	}

	return world;
};
