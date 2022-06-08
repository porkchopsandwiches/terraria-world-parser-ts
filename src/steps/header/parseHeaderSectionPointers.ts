import { range } from "ramda";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = {};
type OutputWorld = Pick<WorldCurrent, "sectionPointers">;

export const parseHeaderSectionPointers: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const sectionCount = readInt16(byteBuffer);
	const world: OutputWorld = {
		sectionPointers: range(0, sectionCount).map(() => {
			return readInt32(byteBuffer);
		}),
	};

	return world;
};
