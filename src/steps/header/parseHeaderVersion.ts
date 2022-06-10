import { readUInt32 } from "../../worldDataSource/readUInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "version">;

export const parseHeaderVersion: ParseStep<InputWorld, OutputWorld> = async (worldDataSource) => {
	const world: OutputWorld = {
		version: readUInt32(worldDataSource),
	};

	if (world.version < 95) {
		throw new Error(`Minimum version is 95, file version is ${world.version}`);
	}

	return world;
};
