import { readBoolean } from "../../bufferReader/readBoolean";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "partyCooldown" | "partyManual" | "partyGenuine" | "partyingNPCs">>;

export const parseFlagsParty: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 170) {
		world.partyManual = readBoolean(byteBuffer);
		world.partyGenuine = readBoolean(byteBuffer);
		world.partyCooldown = readInt32(byteBuffer);
		const partiersCount = readInt32(byteBuffer);
		world.partyingNPCs = [];
		for (let i = 0; i < partiersCount; ++i) {
			world.partyingNPCs.push(readInt32(byteBuffer));
		}
	}
	return world;
};
