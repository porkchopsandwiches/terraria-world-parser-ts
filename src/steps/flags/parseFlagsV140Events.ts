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

export const parseFlagsV140Events: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 140) {
		world.killedMobs = [];
		world.savedTaxCollector = readBoolean(byteBuffer);

		if (sourceWorld.version > 201) {
			world.savedGolfer = readBoolean(byteBuffer);
		}

		world.invasionSizeStart = readInt32(byteBuffer);
		world.cultistDelay = readInt32(byteBuffer);
		world.numberOfMobs = readInt16(byteBuffer);
		for (let i = 0; i < world.numberOfMobs; ++i) {
			world.killedMobs.push(readInt32(byteBuffer));
		}

		world.fastForwardTime = readBoolean(byteBuffer);

		world.beatFishron = readBoolean(byteBuffer);
		world.beatMartians = readBoolean(byteBuffer);
		world.beatLunaticCultist = readBoolean(byteBuffer);
		world.beatMoonlord = readBoolean(byteBuffer);
		world.beatHalloweenKing = readBoolean(byteBuffer);
		world.beatHalloweenTree = readBoolean(byteBuffer);
		world.beatChristmasQueen = readBoolean(byteBuffer);
		world.beatSanta = readBoolean(byteBuffer);
		world.beatChristmasTree = readBoolean(byteBuffer);
		world.celestialSolarDown = readBoolean(byteBuffer);
		world.celestialVortexDown = readBoolean(byteBuffer);
		world.celestialNebulaDown = readBoolean(byteBuffer);
		world.celestialStardustDown = readBoolean(byteBuffer);
		world.celestialSolarActive = readBoolean(byteBuffer);
		world.celestialVortexActive = readBoolean(byteBuffer);
		world.celestialNebulaActive = readBoolean(byteBuffer);
		world.celestialStardustActive = readBoolean(byteBuffer);
		world.apocalypse = readBoolean(byteBuffer);
	}

	return world;
};
