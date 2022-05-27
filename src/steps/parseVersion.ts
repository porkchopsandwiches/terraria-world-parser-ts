import { readUInt32 } from "../bufferReader/readUInt32";
import type { ParseStep } from "../types/ParseStep";
import type { WorldBase } from "../types/Worlds/WorldBase";

export const parseVersion: ParseStep<{}, Pick<WorldBase, "version">> = async (byteBuffer) => {
	const world: Pick<WorldBase, "version"> = {
		version: readUInt32(byteBuffer),
	};

	if (world.version < 95) {
		throw new Error(`Minimum version is 95, file version is ${world.version}`);
	}

	return world;
};
