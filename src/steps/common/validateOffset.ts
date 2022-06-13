import { getOffset } from "../../worldDataSource/getOffset";
import { ParserPointer } from "../../enums/ParserPointer";
import type { ParseConfig } from "../../types/ParseConfig";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "sectionPointers">;

export const validateOffset = (pointer: ParserPointer, callback: ParseConfig["onSectionParsed"]): ParseStep<InputWorld, Record<string, unknown>> => {
	return (worldDataSource, sourceWorld) => {
		const offset = getOffset(worldDataSource);
		const match = offset === sourceWorld.sectionPointers[pointer];

		if (!match) {
			throw new Error(`Invalid parser offset for ${ParserPointer[pointer]}, expected ${sourceWorld.sectionPointers[pointer]} but is actually ${offset}`);
		}

		callback(pointer);

		return {};
	};
};
