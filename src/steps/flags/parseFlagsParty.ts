import { readBoolean } from "../../worldDataSource/readBoolean";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "partyCooldown" | "partyManual" | "partyGenuine" | "partyingNPCs">>;

export const parseFlagsParty: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 170) {
		world.partyManual = readBoolean(worldDataSource);
		world.partyGenuine = readBoolean(worldDataSource);
		world.partyCooldown = readInt32(worldDataSource);
		const partiersCount = readInt32(worldDataSource);
		world.partyingNPCs = [];
		for (let i = 0; i < partiersCount; ++i) {
			world.partyingNPCs.push(readInt32(worldDataSource));
		}
	}

	return world;
};
