import { readByte } from "../../bufferReader/readByte";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "style8" | "style9" | "style11" | "style12" | "style10">>;

export const parseFlagsStyles: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 195) {
		world.style8 = readByte(worldDataSource);
	}

	if (sourceWorld.version >= 215) {
		world.style9 = readByte(worldDataSource);
	}

	if (sourceWorld.version >= 196) {
		world.style10 = readByte(worldDataSource);
		world.style11 = readByte(worldDataSource);
		world.style12 = readByte(worldDataSource);
	}

	return world;
};
