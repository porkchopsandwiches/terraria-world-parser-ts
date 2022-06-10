import { range } from "ramda";
import { readInt16 } from "../../worldDataSource/readInt16";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "sectionPointers">;

export const parseHeaderSectionPointers: ParseStep<InputWorld, OutputWorld> = async (worldDataSource) => {
	const sectionCount = readInt16(worldDataSource);
	const world: OutputWorld = {
		sectionPointers: range(0, sectionCount).map(() => {
			return readInt32(worldDataSource);
		}),
	};

	return world;
};
