import { readBoolean } from "../../bufferReader/readBoolean";
import { readCoord32 } from "../../bufferReader/readCoord32";
import { readCoordFloat } from "../../bufferReader/readCoordFloat";
import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "npcs">;

export const parseNPCs: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {
		npcs: [],
	};

	for (let i = readBoolean(byteBuffer); i; i = readBoolean(byteBuffer)) {
		const spriteId = sourceWorld.version >= 190 ? readInt32(byteBuffer) : 0;
		const spriteName = sourceWorld.version < 190 ? readString(byteBuffer) : "";

		const displayName = readString(byteBuffer);
		const position = readCoordFloat(byteBuffer);
		const isHomeless = readBoolean(byteBuffer);
		const home = readCoord32(byteBuffer);

		const townVariationExists = sourceWorld.version >= 213 ? readBoolean(byteBuffer) : false;
		const townVariation = sourceWorld.version >= 213 && townVariationExists ? readInt32(byteBuffer) : undefined;

		world.npcs.push({
			spriteId,
			spriteName,
			displayName,
			position,
			isHomeless,
			home,
			townVariation,
		});
	}

	return world;
};
