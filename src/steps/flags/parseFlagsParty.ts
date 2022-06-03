import { readBoolean } from "../../bufferReader/readBoolean";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV170 } from "../../types/Worlds/WorldV170";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorldNewer = Pick<WorldV170, "party">;
type OutputWorld = Partial<OutputWorldNewer>;

export const parseFlagsParty: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 170) {
		world.party = {} as OutputWorldNewer["party"];
		world.party.manual = readBoolean(byteBuffer);
		world.party.genuine = readBoolean(byteBuffer);
		world.party.cooldown = readInt32(byteBuffer);
		const loopCount = readInt32(byteBuffer);
		for (let i = 0; i < loopCount; ++i) {
			readInt32(byteBuffer); // What is this? Who knows?
		}
	}
	return world;
};
