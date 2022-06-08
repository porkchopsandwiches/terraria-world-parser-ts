import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readFloat32 } from "../../bufferReader/readFloat32";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "tempRaining" | "tempRainTime" | "tempMaxRain" | "oreTier1" | "oreTier2" | "oreTier3" | "treeBg" | "corruptionBg" | "jungleBg" | "snowBg" | "hallowBg" | "crimsonBg" | "desertBg" | "oceanBg" | "cloudBgActive" | "numClouds" | "windSpeedSet">;

export const parseFlagsEnvironment: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	return {
		tempRaining: readBoolean(byteBuffer),
		tempRainTime: readInt32(byteBuffer),
		tempMaxRain: readFloat32(byteBuffer),
		oreTier1: readInt32(byteBuffer),
		oreTier2: readInt32(byteBuffer),
		oreTier3: readInt32(byteBuffer),
		treeBg: readByte(byteBuffer),
		corruptionBg: readByte(byteBuffer),
		jungleBg: readByte(byteBuffer),
		snowBg: readByte(byteBuffer),
		hallowBg: readByte(byteBuffer),
		crimsonBg: readByte(byteBuffer),
		desertBg: readByte(byteBuffer),
		oceanBg: readByte(byteBuffer),
		cloudBgActive: readInt32(byteBuffer),
		numClouds: readInt16(byteBuffer),
		windSpeedSet: readFloat32(byteBuffer),
	};
};
