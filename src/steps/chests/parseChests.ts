import { readByte } from "../../bufferReader/readByte";
import { readCoord32 } from "../../bufferReader/readCoord32";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ChestItem } from "../../types/ChestItem";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";
import { chestFactory } from "./chestFactory";

type InputWorld = {};
type OutputWorld = Pick<WorldCurrent, "chests">;

export const parseChests: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const world: OutputWorld = {
		chests: [],
	};

	const defaultMaxItems = 40;
	const totalChests = readInt16(byteBuffer);
	const maxItems = readInt16(byteBuffer);
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
	for (let i = 0; i < totalChests; ++i) {
		const coord = readCoord32(byteBuffer);
		const chest = chestFactory(coord, readString(byteBuffer));

		// read items in chest
		for (let slot = 0; slot < itemsPerChest; ++slot) {
			const stackSize = readInt16(byteBuffer);

			if (stackSize) {
				const item: ChestItem = {
					stackSize: 0,
					netId: 0,
					prefix: 0,
				};
				item.netId = readInt32(byteBuffer);
				item.prefix = readByte(byteBuffer);
				item.stackSize = stackSize;
				chest.items[slot] = item;
			}
		}

		// Dump overflow items
		for (let overflow = 0; overflow < overflowItems; ++overflow) {
			const stackSize = readInt16(byteBuffer);
			if (stackSize > 0) {
				readInt32(byteBuffer);
				readByte(byteBuffer);
			}
		}

		world.chests.push(chest);

		// if (!R.has("" + chest.variant.num, world.chests)) {
		//     world.chests[chest.variant.num] = [];
		// }
		// world.chests[chest.variant.num].push(chest);
	}

	return world;
};
