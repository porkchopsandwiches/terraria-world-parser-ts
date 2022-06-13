import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readFloat32 } from "../../worldDataSource/readFloat32";
import { readInt16 } from "../../worldDataSource/readInt16";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "rainIsHappening" | "rainTime" | "rainMaximum" | "oreTier1" | "oreTier2" | "oreTier3" | "styleOfTree" | "styleOfCorruption" | "styleOfJungle" | "styleOfSnow" | "styleOfHallow" | "styleOfCrimson" | "styleOfDesert" | "styleOfOcean" | "cloudBackground" | "cloudCount" | "windSpeedSet">;

export const parseFlagsEnvironment: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
	return {
		rainIsHappening: readBoolean(worldDataSource),
		rainTime: readInt32(worldDataSource),
		rainMaximum: readFloat32(worldDataSource),
		oreTier1: readInt32(worldDataSource),
		oreTier2: readInt32(worldDataSource),
		oreTier3: readInt32(worldDataSource),
		styleOfTree: readByte(worldDataSource),
		styleOfCorruption: readByte(worldDataSource),
		styleOfJungle: readByte(worldDataSource),
		styleOfSnow: readByte(worldDataSource),
		styleOfHallow: readByte(worldDataSource),
		styleOfCrimson: readByte(worldDataSource),
		styleOfDesert: readByte(worldDataSource),
		styleOfOcean: readByte(worldDataSource),
		cloudBackground: readInt32(worldDataSource),
		cloudCount: readInt16(worldDataSource),
		windSpeedSet: readFloat32(worldDataSource),
	};
};
