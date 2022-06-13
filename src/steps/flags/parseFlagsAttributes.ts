import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readCoord32 } from "../../worldDataSource/readCoord32";
import { readFloat64 } from "../../worldDataSource/readFloat64";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readInt32s } from "../../worldDataSource/readInt32s";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "moonType" | "treeX" | "treeStyle" | "caveBackX" | "caveBackStyle" | "iceBackStyle" | "jungleBackStyle" | "hellBackStyle" | "spawn" | "groundLevel" | "rockLevel" | "time" | "isDayTime" | "moonPhase" | "isBloodMoon" | "isEclipse" | "dungeon" | "isCrimson">;

export const parseFlagsAttributes: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
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
