import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readFloat32 } from "../../bufferReader/readFloat32";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = {};
type OutputWorld = Pick<WorldBase, "tempRaining" | "tempRainTime" | "tempMaxRain" | "oreTier1" | "oreTier2" | "oreTier3" | "treeBg" | "corruptionBg" | "jungleBg" | "snowBg" | "hallowBg" | "crimsonBg" | "desertBg" | "oceanBg" | "cloudBgActive" | "numClouds" | "windSpeedSet">;

export const parseFlagsEnvironment: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const world: OutputWorld = {} as never;
	world.tempRaining = readBoolean(byteBuffer);
	world.tempRainTime = readInt32(byteBuffer);
	world.tempMaxRain = readFloat32(byteBuffer);
	world.oreTier1 = readInt32(byteBuffer);
	world.oreTier2 = readInt32(byteBuffer);
	world.oreTier3 = readInt32(byteBuffer);
	world.treeBg = readByte(byteBuffer);
	world.corruptionBg = readByte(byteBuffer);
	world.jungleBg = readByte(byteBuffer);
	world.snowBg = readByte(byteBuffer);
	world.hallowBg = readByte(byteBuffer);
	world.crimsonBg = readByte(byteBuffer);
	world.desertBg = readByte(byteBuffer);
	world.oceanBg = readByte(byteBuffer);
	world.cloudBgActive = readInt32(byteBuffer);
	world.numClouds = readInt16(byteBuffer);
	world.windSpeedSet = readFloat32(byteBuffer);
	return world;
};
