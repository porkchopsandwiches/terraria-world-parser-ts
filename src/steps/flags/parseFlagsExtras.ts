import { readBoolean } from "../../bufferReader/readBoolean";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV240 } from "../../types/Worlds/WorldV240";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV240, "killedQueenSlime" | "killedEmpressOfLight" | "boughtCat" | "boughtDog" | "boughtBunny" | "goldTypeId" | "silverTypeId" | "ironTypeId" | "copperTypeId" | "forcedChristmas" | "forcedHalloween" | "treeTops" | "treeTopCount" | "nextLanternNightWillBeGenuine" | "lanternNightCooldown" | "manualLanternNight" | "realLanternNight" | "combatBookUsed" | "beatDeerClops">>;

export const parseFlagsExtras: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	const { version } = sourceWorld;

	if (version >= 204) {
		world.combatBookUsed = readBoolean(byteBuffer);
	}
	if (version >= 207) {
		world.lanternNightCooldown = readInt32(byteBuffer);
		world.realLanternNight = readBoolean(byteBuffer);
		world.manualLanternNight = readBoolean(byteBuffer);
		world.nextLanternNightWillBeGenuine = readBoolean(byteBuffer);
	}
	if (version >= 211) {
		world.treeTopCount = readInt32(byteBuffer);
		world.treeTops = [];
		for (let i = 0; i < world.treeTopCount; ++i) {
			world.treeTops.push(readInt32(byteBuffer));
		}
	}
	if (version >= 212) {
		world.forcedHalloween = readBoolean(byteBuffer);
		world.forcedChristmas = readBoolean(byteBuffer);
	}
	if (version >= 216) {
		world.copperTypeId = readInt32(byteBuffer);
		world.ironTypeId = readInt32(byteBuffer);
		world.silverTypeId = readInt32(byteBuffer);
		world.goldTypeId = readInt32(byteBuffer);
	}
	if (version >= 217) {
		world.boughtCat = readBoolean(byteBuffer);
		world.boughtDog = readBoolean(byteBuffer);
		world.boughtBunny = readBoolean(byteBuffer);
	}
	if (version >= 223) {
		world.killedEmpressOfLight = readBoolean(byteBuffer);
		world.killedQueenSlime = readBoolean(byteBuffer);
	}
	if (version >= 240) {
		world.beatDeerClops = readBoolean(byteBuffer);
	}
	return world;
};
