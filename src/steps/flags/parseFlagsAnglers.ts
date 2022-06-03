import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV095 } from "../../types/Worlds/WorldV095";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV095, "anglers">>;

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
