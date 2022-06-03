import { readByte } from "../../bufferReader/readByte";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV215 } from "../../types/Worlds/WorldV215";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV215, "style8" | "style9" | "style11" | "style12" | "style10">>;

export const parseFlagsStyles: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 195) {
		world.style8 = readByte(byteBuffer);
	}
	if (sourceWorld.version >= 215) {
		world.style9 = readByte(byteBuffer);
	}
	if (sourceWorld.version >= 196) {
		world.style10 = readByte(byteBuffer);
		world.style11 = readByte(byteBuffer);
		world.style12 = readByte(byteBuffer);
	}
	return world;
};
