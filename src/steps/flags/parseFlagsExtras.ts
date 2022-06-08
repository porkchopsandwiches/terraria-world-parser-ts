import { readBoolean } from "../../bufferReader/readBoolean";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<
	Pick<
		WorldCurrent,
		| "killedQueenSlime"
		| "killedEmpressOfLight"
		| "boughtCat"
		| "boughtDog"
		| "boughtBunny"
		| "goldTypeId"
		| "silverTypeId"
		| "ironTypeId"
		| "copperTypeId"
		| "forcedChristmas"
		| "forcedHalloween"
		| "treeTops"
		| "treeTopCount"
		| "nextLanternNightWillBeGenuine"
		| "lanternNightCooldown"
		| "manualLanternNight"
		| "realLanternNight"
		| "combatBookUsed"
		| "beatDeerClops"
	>
>;

export const parseFlagsExtras: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};
	const { version } = sourceWorld;

	if (version >= 204) {
		world.combatBookUsed = readBoolean(worldDataSource);
	}

	if (version >= 207) {
		world.lanternNightCooldown = readInt32(worldDataSource);
		world.realLanternNight = readBoolean(worldDataSource);
		world.manualLanternNight = readBoolean(worldDataSource);
		world.nextLanternNightWillBeGenuine = readBoolean(worldDataSource);
	}

	if (version >= 211) {
		world.treeTopCount = readInt32(worldDataSource);
		world.treeTops = [];
		for (let i = 0; i < world.treeTopCount; ++i) {
			world.treeTops.push(readInt32(worldDataSource));
		}
	}

	if (version >= 212) {
		world.forcedHalloween = readBoolean(worldDataSource);
		world.forcedChristmas = readBoolean(worldDataSource);
	}

	if (version >= 216) {
		world.copperTypeId = readInt32(worldDataSource);
		world.ironTypeId = readInt32(worldDataSource);
		world.silverTypeId = readInt32(worldDataSource);
		world.goldTypeId = readInt32(worldDataSource);
	}

	if (version >= 217) {
		world.boughtCat = readBoolean(worldDataSource);
		world.boughtDog = readBoolean(worldDataSource);
		world.boughtBunny = readBoolean(worldDataSource);
	}

	if (version >= 223) {
		world.killedEmpressOfLight = readBoolean(worldDataSource);
		world.killedQueenSlime = readBoolean(worldDataSource);
	}

	if (version >= 240) {
		world.beatDeerClops = readBoolean(worldDataSource);
	}

	return world;
};
