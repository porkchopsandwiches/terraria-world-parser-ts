import { readBoolean } from "../../worldDataSource/readBoolean";
import { readInt16 } from "../../worldDataSource/readInt16";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<
	Pick<
		WorldCurrent,
		| "apocalypse"
		| "celestialNebulaActive"
		| "celestialSolarActive"
		| "celestialNebulaDown"
		| "celestialSolarDown"
		| "celestialStardustActive"
		| "celestialStardustDown"
		| "celestialVortexActive"
		| "celestialVortexDown"
		| "beatBossSpookyWood"
		| "beatBossIceQueen"
		| "beatBossChristmasTree"
		| "beatBossPumpking"
		| "beatBossFishron"
		| "beatInvasionMartians"
		| "beatBossLunaticCultist"
		| "beatBossMoonlord"
		| "beatBossSanTank"
		| "killedMobs"
		| "savedTaxCollector"
		| "savedGolfer"
		| "invasionSizeStart"
		| "cultistDelay"
		| "numberOfMobs"
		| "fastForwardTime"
	>
>;

export const parseFlagsV140Events: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 140) {
		world.killedMobs = [];
		world.savedTaxCollector = readBoolean(worldDataSource);

		if (sourceWorld.version > 201) {
			world.savedGolfer = readBoolean(worldDataSource);
		}

		world.invasionSizeStart = readInt32(worldDataSource);
		world.cultistDelay = readInt32(worldDataSource);
		world.numberOfMobs = readInt16(worldDataSource);
		for (let index = 0; index < world.numberOfMobs; ++index) {
			world.killedMobs.push(readInt32(worldDataSource));
		}

		world.fastForwardTime = readBoolean(worldDataSource);

		world.beatBossFishron = readBoolean(worldDataSource);
		world.beatInvasionMartians = readBoolean(worldDataSource);
		world.beatBossLunaticCultist = readBoolean(worldDataSource);
		world.beatBossMoonlord = readBoolean(worldDataSource);
		world.beatBossPumpking = readBoolean(worldDataSource);
		world.beatBossSpookyWood = readBoolean(worldDataSource);
		world.beatBossIceQueen = readBoolean(worldDataSource);
		world.beatBossSanTank = readBoolean(worldDataSource);
		world.beatBossChristmasTree = readBoolean(worldDataSource);
		world.celestialSolarDown = readBoolean(worldDataSource);
		world.celestialVortexDown = readBoolean(worldDataSource);
		world.celestialNebulaDown = readBoolean(worldDataSource);
		world.celestialStardustDown = readBoolean(worldDataSource);
		world.celestialSolarActive = readBoolean(worldDataSource);
		world.celestialVortexActive = readBoolean(worldDataSource);
		world.celestialNebulaActive = readBoolean(worldDataSource);
		world.celestialStardustActive = readBoolean(worldDataSource);
		world.apocalypse = readBoolean(worldDataSource);
	}

	return world;
};
