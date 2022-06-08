import { readBoolean } from "../../bufferReader/readBoolean";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
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
		| "beatHalloweenTree"
		| "beatChristmasQueen"
		| "beatChristmasTree"
		| "beatHalloweenKing"
		| "beatFishron"
		| "beatMartians"
		| "beatLunaticCultist"
		| "beatMoonlord"
		| "beatSanta"
		| "killedMobs"
		| "savedTaxCollector"
		| "savedGolfer"
		| "invasionSizeStart"
		| "cultistDelay"
		| "numberOfMobs"
		| "fastForwardTime"
	>
>;

export const parseFlagsV140Events: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
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
		for (let i = 0; i < world.numberOfMobs; ++i) {
			world.killedMobs.push(readInt32(worldDataSource));
		}

		world.fastForwardTime = readBoolean(worldDataSource);

		world.beatFishron = readBoolean(worldDataSource);
		world.beatMartians = readBoolean(worldDataSource);
		world.beatLunaticCultist = readBoolean(worldDataSource);
		world.beatMoonlord = readBoolean(worldDataSource);
		world.beatHalloweenKing = readBoolean(worldDataSource);
		world.beatHalloweenTree = readBoolean(worldDataSource);
		world.beatChristmasQueen = readBoolean(worldDataSource);
		world.beatSanta = readBoolean(worldDataSource);
		world.beatChristmasTree = readBoolean(worldDataSource);
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
