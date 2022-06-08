import { getOffset } from "../../bufferReader/getOffset";
import { ParserPointer } from "../../enums/ParserPointer";
import type { ParseConfig } from "../../types/ParseConfig";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "sectionPointers" | "version">;

export const conditionallyValidateOffset = (minVersion: number, pointer: ParserPointer, callback: ParseConfig["onSectionParsed"]): ParseStep<InputWorld, Record<string, unknown>> => {
	return async (worldDataSource, sourceWorld) => {
		if (sourceWorld.version < minVersion) {
			return {};
		}

		const offset = getOffset(worldDataSource);
		const match = offset === sourceWorld.sectionPointers[pointer];

		if (!match) {
			throw new Error(`Invalid parser offset for ${ParserPointer[pointer]}, expected ${sourceWorld.sectionPointers[pointer]} but is actually ${offset}`);
		}

		callback(pointer);

		return {};
	};
};
