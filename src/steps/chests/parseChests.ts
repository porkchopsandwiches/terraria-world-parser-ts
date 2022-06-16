import { readByte } from "../../worldDataSource/readByte";
import { readCoord32 } from "../../worldDataSource/readCoord32";
import { readInt16 } from "../../worldDataSource/readInt16";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readString } from "../../worldDataSource/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";
import { chestFactory } from "./chestFactory";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "chests">;

export const parseChests: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
	const world: OutputWorld = {
		chests: [],
	};

	const defaultMaxItems = 40;
	const totalChests = readInt16(worldDataSource);
	const maxItems = readInt16(worldDataSource);
	let itemsPerChest: number;
	let overflowItems: number;

	// Check overflow
	if (maxItems >= defaultMaxItems) {
		itemsPerChest = defaultMaxItems;
		overflowItems = maxItems - defaultMaxItems;
	} else {
		itemsPerChest = maxItems;
		overflowItems = 0;
	}

	// Read chests
	for (let index = 0; index < totalChests; ++index) {
		const coord = readCoord32(worldDataSource);
		const chest = chestFactory(coord, readString(worldDataSource));

		// Read items in chest
		for (let slot = 0; slot < itemsPerChest; ++slot) {
			const stackSize = readInt16(worldDataSource);

			if (stackSize) {
				chest.slots[slot] = {
					stackSize,
					itemId: readInt32(worldDataSource),
					prefix: readByte(worldDataSource),
				};
			}
		}

		// Dump overflow items
		for (let overflow = 0; overflow < overflowItems; ++overflow) {
			const stackSize = readInt16(worldDataSource);
			if (stackSize > 0) {
				readInt32(worldDataSource);
				readByte(worldDataSource);
			}
		}

		world.chests.push(chest);

		// If (!R.has("" + chest.variant.num, world.chests)) {
		//     world.chests[chest.variant.num] = [];
		// }
		// world.chests[chest.variant.num].push(chest);
	}

	return world;
};
