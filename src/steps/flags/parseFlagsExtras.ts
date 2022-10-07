import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<
	Pick<
		WorldCurrent,
		| "beatBossQueenSlime"
		| "beatBossEmpressOfLight"
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
		| "beatBossDeerClops"
		| "unlockedSlimeBlueSpawn"
		| "unlockedMerchantSpawn"
		| "unlockedDemolitionistSpawn"
		| "unlockedPartyGirlSpawn"
		| "unlockedDyeTraderSpawn"
		| "unlockedTruffleSpawn"
		| "unlockedArmsDealerSpawn"
		| "unlockedNurseSpawn"
		| "unlockedPrincessSpawn"
		| "combatBookVolumeTwoUsed"
		| "peddlersSatchelUsed"
		| "unlockedSlimeGreenSpawn"
		| "unlockedSlimeOldSpawn"
		| "unlockedSlimePurpleSpawn"
		| "unlockedSlimeRainbowSpawn"
		| "unlockedSlimeRedSpawn"
		| "unlockedSlimeYellowSpawn"
		| "unlockedSlimeCopperSpawn"
		| "fastForwardTimeToDusk"
		| "moondialCooldown"
	>
>;

export const parseFlagsExtras: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
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
		for (let index = 0; index < world.treeTopCount; ++index) {
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
		world.beatBossEmpressOfLight = readBoolean(worldDataSource);
		world.beatBossQueenSlime = readBoolean(worldDataSource);
	}

	if (version >= 240) {
		world.beatBossDeerClops = readBoolean(worldDataSource);
	}

	if (version >= 250) {
		world.unlockedSlimeBlueSpawn = readBoolean(worldDataSource);
	}

	if (version >= 251) {
		world.unlockedMerchantSpawn = readBoolean(worldDataSource);
		world.unlockedDemolitionistSpawn = readBoolean(worldDataSource);
		world.unlockedPartyGirlSpawn = readBoolean(worldDataSource);
		world.unlockedDyeTraderSpawn = readBoolean(worldDataSource);
		world.unlockedTruffleSpawn = readBoolean(worldDataSource);
		world.unlockedArmsDealerSpawn = readBoolean(worldDataSource);
		world.unlockedNurseSpawn = readBoolean(worldDataSource);
		world.unlockedPrincessSpawn = readBoolean(worldDataSource);
	}

	if (version >= 259) {
		world.combatBookVolumeTwoUsed = readBoolean(worldDataSource);
	}

	if (version >= 260) {
		world.peddlersSatchelUsed = readBoolean(worldDataSource);
	}

	if (version >= 261) {
		world.unlockedSlimeGreenSpawn = readBoolean(worldDataSource);
		world.unlockedSlimeOldSpawn = readBoolean(worldDataSource);
		world.unlockedSlimePurpleSpawn = readBoolean(worldDataSource);
		world.unlockedSlimeRainbowSpawn = readBoolean(worldDataSource);
		world.unlockedSlimeRedSpawn = readBoolean(worldDataSource);
		world.unlockedSlimeYellowSpawn = readBoolean(worldDataSource);
		world.unlockedSlimeCopperSpawn = readBoolean(worldDataSource);
	}

	if (version >= 264) {
		world.fastForwardTimeToDusk = readBoolean(worldDataSource);
		world.moondialCooldown = readByte(worldDataSource);
	}

	return world;
};
