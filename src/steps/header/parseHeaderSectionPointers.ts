import { range } from "ramda";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = {};
type OutputWorld = Pick<WorldBase, "sectionPointers">;

export const parseHeaderSectionPointers: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const sectionCount = readInt16(byteBuffer);
	const world: Pick<WorldBase, "sectionPointers"> = { sectionPointers: range(0, sectionCount).map(() => {
			return readInt32(byteBuffer);
		}) };

	return world;
};
