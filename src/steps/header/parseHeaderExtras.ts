import { readByte } from "../../bufferReader/readByte";
import { readFixedLengthString } from "../../bufferReader/readFixedLengthString";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV140 } from "../../types/Worlds/WorldV140";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorld = Partial<Pick<WorldV140, "fileRevision">>;

export const parseHeaderExtras: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	if (sourceWorld.version < 135) {
		return {};
	}

	const relogic = readFixedLengthString(byteBuffer, 7);

	if (relogic !== "relogic") {
		throw new Error("Did not find expected relogic string in header.");
	}

	const fileRevision = readByte(byteBuffer);

	// 12 more bytes of silliness
	readInt32(byteBuffer);
	readInt32(byteBuffer);
	readInt32(byteBuffer);

	// // 8 bytes of file format as a long int -- but we can ignore this because we never use it
	// readInt32(byteBuffer);
	// readInt32(byteBuffer);

	// const world: Pick<WorldV140, "fileRevision"> = {
	// 	fileRevision: readInt32(byteBuffer),
	// };

	// 8 bytes of 'favourite' as a long int -- but we can ignore this because we never use it
	// readInt32(byteBuffer);
	// readInt32(byteBuffer);

	return { fileRevision };
};
