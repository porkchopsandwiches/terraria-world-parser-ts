import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readFloat64 } from "../../bufferReader/readFloat64";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "eventsClown" | "eventsGoblins" | "eventsFrost" | "eventsPirates" | "shadowOrbSmashed" | "spawnMeteor" | "shadowOrbCount" | "altarCount" | "hardMode" | "invasionDelay" | "invasionSize" | "invasionType" | "invasionX">;

export const parseFlagsEvents: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	return {
		eventsGoblins: readBoolean(byteBuffer),
		eventsClown: readBoolean(byteBuffer),
		eventsFrost: readBoolean(byteBuffer),
		eventsPirates: readBoolean(byteBuffer),

		shadowOrbSmashed: readBoolean(byteBuffer),
		spawnMeteor: readBoolean(byteBuffer),
		shadowOrbCount: readByte(byteBuffer),
		altarCount: readInt32(byteBuffer),
		hardMode: readBoolean(byteBuffer),
		invasionDelay: readInt32(byteBuffer),
		invasionSize: readInt32(byteBuffer),
		invasionType: readInt32(byteBuffer),
		invasionX: readFloat64(byteBuffer),
	};
};
