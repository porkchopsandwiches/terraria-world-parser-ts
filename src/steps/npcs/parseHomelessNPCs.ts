import { readBoolean } from "../../worldDataSource/readBoolean";
import { readCoordFloat } from "../../worldDataSource/readCoordFloat";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readString } from "../../worldDataSource/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "homelessNPCs">;

export const parseHomelessNPCs: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {
		homelessNPCs: [],
	};

	if (sourceWorld.version >= 140) {
		for (let index = readBoolean(worldDataSource); index; index = readBoolean(worldDataSource)) {
			const spriteId = sourceWorld.version >= 190 ? readInt32(worldDataSource) : 0;
			const spriteName = sourceWorld.version < 190 ? readString(worldDataSource) : "";
			const position = readCoordFloat(worldDataSource);

			world.homelessNPCs.push({
				spriteId,
				spriteName,
				displayName: "",
				position,
				isHomeless: true,
			});
		}
	}

	return world;
};
