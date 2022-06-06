import { getOffset } from "../../bufferReader/getOffset";
import { ParserPointer } from "../../enums/ParserPointer";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = Pick<WorldBase, "sectionPointers" | "version">;

export const conditionallyValidateOffset = (minVersion: number, pointer: ParserPointer): ParseStep<InputWorld, {}> => {
	return async (byteBuffer, sourceWorld) => {
		if (sourceWorld.version < minVersion) {
			return {};
		}

		const offset = getOffset(byteBuffer);
		const match = offset === sourceWorld.sectionPointers[pointer];

		if (!match) {
			throw new Error(`Invalid parser offset for ${ParserPointer[pointer]}, expected ${sourceWorld.sectionPointers[pointer]} but is actually ${offset}`);
		}

		return {};
	};
}
