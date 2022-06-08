import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readFloat64 } from "../../bufferReader/readFloat64";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "eventsClown" | "eventsGoblins" | "eventsFrost" | "eventsPirates" | "shadowOrbSmashed" | "spawnMeteor" | "shadowOrbCount" | "altarCount" | "hardMode" | "invasionDelay" | "invasionSize" | "invasionType" | "invasionX">;

export const parseFlagsEvents: ParseStep<InputWorld, OutputWorld> = async (worldDataSource) => {
	return {
		eventsGoblins: readBoolean(worldDataSource),
		eventsClown: readBoolean(worldDataSource),
		eventsFrost: readBoolean(worldDataSource),
		eventsPirates: readBoolean(worldDataSource),

		shadowOrbSmashed: readBoolean(worldDataSource),
		spawnMeteor: readBoolean(worldDataSource),
		shadowOrbCount: readByte(worldDataSource),
		altarCount: readInt32(worldDataSource),
		hardMode: readBoolean(worldDataSource),
		invasionDelay: readInt32(worldDataSource),
		invasionSize: readInt32(worldDataSource),
		invasionType: readInt32(worldDataSource),
		invasionX: readFloat64(worldDataSource),
	};
};
