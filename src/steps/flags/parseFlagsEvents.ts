import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readFloat64 } from "../../bufferReader/readFloat64";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = {};
type OutputWorld = Pick<WorldBase, "eventsClown" | "eventsGoblins" | "eventsFrost" | "eventsPirates" | "shadowOrbSmashed" | "spawnMeteor" | "shadowOrbCount" | "altarCount" | "hardMode" | "invasionDelay" | "invasionSize" | "invasionType" | "invasionX">;

export const parseFlagsEvents: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const world: OutputWorld = {} as never;

	world.eventsGoblins = readBoolean(byteBuffer);
	world.eventsClown = readBoolean(byteBuffer);
	world.eventsFrost = readBoolean(byteBuffer);
	world.eventsPirates = readBoolean(byteBuffer);

	world.shadowOrbSmashed = readBoolean(byteBuffer);
	world.spawnMeteor = readBoolean(byteBuffer);
	world.shadowOrbCount = readByte(byteBuffer);
	world.altarCount = readInt32(byteBuffer);
	world.hardMode = readBoolean(byteBuffer);
	world.invasionDelay = readInt32(byteBuffer);
	world.invasionSize = readInt32(byteBuffer);
	world.invasionType = readInt32(byteBuffer);
	world.invasionX = readFloat64(byteBuffer);
	return world;
};
