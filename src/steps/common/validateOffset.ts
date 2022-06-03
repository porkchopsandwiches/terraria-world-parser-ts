import { getOffset } from "../../bufferReader/getOffset";
import type { ParserPointer } from "../../enums/ParserPointer";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = Pick<WorldBase, "sectionPointers">;

export const validateOffset = (pointer: ParserPointer): ParseStep<InputWorld, {}> => {
	return async (byteBuffer, sourceWorld) => {
		const offset = getOffset(byteBuffer);
		const match = offset === sourceWorld.sectionPointers[pointer];

		if (!match) {
			throw new Error(`Invalid parser offset, expected ${sourceWorld.sectionPointers[pointer]} but is actually ${offset}`);
		}

		return {};
	};
}
