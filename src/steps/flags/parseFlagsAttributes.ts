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

export const parseFlagsAttributes: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	return {
		moonType: readByte(byteBuffer),
		treeX: readInt32s(3, byteBuffer),
		treeStyle: readInt32s(4, byteBuffer),
		caveBackX: readInt32s(3, byteBuffer),
		caveBackStyle: readInt32s(4, byteBuffer),
		iceBackStyle: readInt32(byteBuffer),
		jungleBackStyle: readInt32(byteBuffer),
		hellBackStyle: readInt32(byteBuffer),

		spawn: readCoord32(byteBuffer),

		groundLevel: readFloat64(byteBuffer),
		rockLevel: readFloat64(byteBuffer),
		time: readFloat64(byteBuffer),

		isDayTime: readBoolean(byteBuffer),
		moonPhase: readInt32(byteBuffer),
		isBloodMoon: readBoolean(byteBuffer),
		isEclipse: readBoolean(byteBuffer),
		dungeon: readCoord32(byteBuffer),
		isCrimson: readBoolean(byteBuffer),
	};
};
