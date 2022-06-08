import { readByte } from "../../bufferReader/readByte";
import { readInt16 } from "../../bufferReader/readInt16";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "tileFrameImportance">;

export const parseHeaderTileFrameImportance: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	// Read tile frame importance from bit-packed data
	const world: OutputWorld = { tileFrameImportance: [] };

	// Number of bits
	const bitsCount = readInt16(byteBuffer);

	// @todo inject default false values for all bits by default?

	let data = 0;
	let mask = 128;
	for (let i = 0; i < bitsCount; ++i) {
		if (mask === 128) {
			data = readByte(byteBuffer);
			mask = 1;
		} else {
			mask <<= 1;
		}

		if ((data & mask) === mask) {
			world.tileFrameImportance[i] = true;
		}
	}

	return world;
};
