import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readCoord32 } from "../../bufferReader/readCoord32";
import { readFloat64 } from "../../bufferReader/readFloat64";
import { readInt32 } from "../../bufferReader/readInt32";
import { readInt32s } from "../../bufferReader/readInt32s";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "moonType" | "treeX" | "treeStyle" | "caveBackX" | "caveBackStyle" | "iceBackStyle" | "jungleBackStyle" | "hellBackStyle" | "spawn" | "groundLevel" | "rockLevel" | "time" | "isDayTime" | "moonPhase" | "isBloodMoon" | "isEclipse" | "dungeon" | "isCrimson">;

export const parseFlagsAttributes: ParseStep<InputWorld, OutputWorld> = async (worldDataSource) => {
	return {
		moonType: readByte(worldDataSource),
		treeX: readInt32s(3, worldDataSource),
		treeStyle: readInt32s(4, worldDataSource),
		caveBackX: readInt32s(3, worldDataSource),
		caveBackStyle: readInt32s(4, worldDataSource),
		iceBackStyle: readInt32(worldDataSource),
		jungleBackStyle: readInt32(worldDataSource),
		hellBackStyle: readInt32(worldDataSource),

		spawn: readCoord32(worldDataSource),

		groundLevel: readFloat64(worldDataSource),
		rockLevel: readFloat64(worldDataSource),
		time: readFloat64(worldDataSource),

		isDayTime: readBoolean(worldDataSource),
		moonPhase: readInt32(worldDataSource),
		isBloodMoon: readBoolean(worldDataSource),
		isEclipse: readBoolean(worldDataSource),
		dungeon: readCoord32(worldDataSource),
		isCrimson: readBoolean(worldDataSource),
	};
};
