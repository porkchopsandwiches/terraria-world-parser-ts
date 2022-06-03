import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readCoord32 } from "../../bufferReader/readCoord32";
import { readFloat64 } from "../../bufferReader/readFloat64";
import { readInt32 } from "../../bufferReader/readInt32";
import { readInt32s } from "../../bufferReader/readInt32s";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = {};
type OutputWorld = Pick<WorldBase, "moonType" | "treeX" | "treeStyle" | "caveBackX" | "caveBackStyle" | "iceBackStyle" | "jungleBackStyle" | "hellBackStyle" | "spawn" | "groundLevel" | "rockLevel" | "time" | "isDayTime" | "moonPhase" | "isBloodMoon" | "isEclipse" | "dungeon" | "isCrimson">;

export const parseFlagsAttributes: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const world: OutputWorld = {} as never;
	world.moonType = readByte(byteBuffer);
	world.treeX = readInt32s(3, byteBuffer);
	world.treeStyle = readInt32s(4, byteBuffer);
	world.caveBackX = readInt32s(3, byteBuffer);
	world.caveBackStyle = readInt32s(4, byteBuffer);
	world.iceBackStyle = readInt32(byteBuffer);
	world.jungleBackStyle = readInt32(byteBuffer);
	world.hellBackStyle = readInt32(byteBuffer);

	world.spawn = readCoord32(byteBuffer);

	world.groundLevel = readFloat64(byteBuffer);
	world.rockLevel = readFloat64(byteBuffer);
	world.time = readFloat64(byteBuffer);

	world.isDayTime = readBoolean(byteBuffer);
	world.moonPhase = readInt32(byteBuffer);
	world.isBloodMoon = readBoolean(byteBuffer);
	world.isEclipse = readBoolean(byteBuffer);
	world.dungeon = readCoord32(byteBuffer);
	world.isCrimson = readBoolean(byteBuffer);
	return world;
};
