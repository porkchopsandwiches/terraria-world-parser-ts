import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readFloat32 } from "../../bufferReader/readFloat32";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "tempRaining" | "tempRainTime" | "tempMaxRain" | "oreTier1" | "oreTier2" | "oreTier3" | "treeBg" | "corruptionBg" | "jungleBg" | "snowBg" | "hallowBg" | "crimsonBg" | "desertBg" | "oceanBg" | "cloudBgActive" | "numClouds" | "windSpeedSet">;

export const parseFlagsEnvironment: ParseStep<InputWorld, OutputWorld> = async (worldDataSource) => {
	return {
		tempRaining: readBoolean(worldDataSource),
		tempRainTime: readInt32(worldDataSource),
		tempMaxRain: readFloat32(worldDataSource),
		oreTier1: readInt32(worldDataSource),
		oreTier2: readInt32(worldDataSource),
		oreTier3: readInt32(worldDataSource),
		treeBg: readByte(worldDataSource),
		corruptionBg: readByte(worldDataSource),
		jungleBg: readByte(worldDataSource),
		snowBg: readByte(worldDataSource),
		hallowBg: readByte(worldDataSource),
		crimsonBg: readByte(worldDataSource),
		desertBg: readByte(worldDataSource),
		oceanBg: readByte(worldDataSource),
		cloudBgActive: readInt32(worldDataSource),
		numClouds: readInt16(worldDataSource),
		windSpeedSet: readFloat32(worldDataSource),
	};
};
