import { readByte } from "../../worldDataSource/readByte";
import { readFixedLengthString } from "../../worldDataSource/readFixedLengthString";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "fileRevision">>;

export const parseHeaderExtras: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	if (sourceWorld.version < 135) {
		return {};
	}

	const relogic = readFixedLengthString(worldDataSource, 7);

	if (relogic !== "relogic") {
		throw new Error("Did not find expected relogic string in header.");
	}

	const fileRevision = readByte(worldDataSource);

	// 12 more bytes of silliness
	readInt32(worldDataSource);
	readInt32(worldDataSource);
	readInt32(worldDataSource);

	// // 8 bytes of file format as a long int -- but we can ignore this because we never use it
	// readInt32(worldDataSource);
	// readInt32(worldDataSource);

	// const world: Pick<WorldV140, "fileRevision"> = {
	// 	fileRevision: readInt32(worldDataSource),
	// };

	// 8 bytes of 'favourite' as a long int -- but we can ignore this because we never use it
	// readInt32(worldDataSource);
	// readInt32(worldDataSource);

	return { fileRevision };
};
