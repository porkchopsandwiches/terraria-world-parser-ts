import { readUInt32 } from "../../bufferReader/readUInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "version">;

export const parseHeaderVersion: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const world: OutputWorld = {
		version: readUInt32(byteBuffer),
	};

	if (world.version < 95) {
		throw new Error(`Minimum version is 95, file version is ${world.version}`);
	}

	return world;
};
