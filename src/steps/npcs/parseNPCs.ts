import { readBoolean } from "../../bufferReader/readBoolean";
import { readCoord32 } from "../../bufferReader/readCoord32";
import { readCoordFloat } from "../../bufferReader/readCoordFloat";
import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "npcs">;

export const parseNPCs: ParseStep<InputWorld, OutputWorld> = async (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {
		npcs: [],
	};

	for (let i = readBoolean(worldDataSource); i; i = readBoolean(worldDataSource)) {
		const spriteId = sourceWorld.version >= 190 ? readInt32(worldDataSource) : 0;
		const spriteName = sourceWorld.version < 190 ? readString(worldDataSource) : "";

		const displayName = readString(worldDataSource);
		const position = readCoordFloat(worldDataSource);
		const isHomeless = readBoolean(worldDataSource);
		const home = readCoord32(worldDataSource);

		const townVariationExists = sourceWorld.version >= 213 ? readBoolean(worldDataSource) : false;
		const townVariation = sourceWorld.version >= 213 && townVariationExists ? readInt32(worldDataSource) : undefined;

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
