import { readByte } from "../../worldDataSource/readByte";
import { readInt16 } from "../../worldDataSource/readInt16";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "tileFrameImportance">;

export const parseHeaderTileFrameImportance: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
	// Read tile frame importance from bit-packed data
	const world: OutputWorld = { tileFrameImportance: [] };

	// Number of bits
	const bitsCount = readInt16(worldDataSource);

	// @todo inject default false values for all bits by default?

	let data = 0;
	let mask = 128;
	for (let index = 0; index < bitsCount; ++index) {
		if (mask === 128) {
			data = readByte(worldDataSource);
			mask = 1;
		} else {
			mask <<= 1;
		}

		if ((data & mask) === mask) {
			world.tileFrameImportance[index] = true;
		}
	}

	return world;
};
