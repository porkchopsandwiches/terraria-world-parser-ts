import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV140 } from "../../types/Worlds/WorldV140";

export const parseHeaderExtras: ParseStep<Pick<WorldBase, "version">, Partial<Pick<WorldV140, "fileRevision">>> = async (byteBuffer, sourceWorld) => {
	if (sourceWorld.version < 140) {
		return {};
	}

	// 8 bytes of file format as a long int -- but we can ignore this because we never use it
	readInt32(byteBuffer);
	readInt32(byteBuffer);

	const world: Pick<WorldV140, "fileRevision"> = {
		fileRevision: readInt32(byteBuffer),
	};

	// 8 bytes of 'favourite' as a long int -- but we can ignore this because we never use it
	readInt32(byteBuffer);
	readInt32(byteBuffer);

	return world;
};
