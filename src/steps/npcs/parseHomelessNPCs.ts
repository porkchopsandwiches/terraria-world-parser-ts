import { readBoolean } from "../../bufferReader/readBoolean";
import { readCoordFloat } from "../../bufferReader/readCoordFloat";
import { readInt32 } from "../../bufferReader/readInt32";
import { readString } from "../../bufferReader/readString";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "homelessNPCs">;

export const parseHomelessNPCs: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {
		homelessNPCs: [],
	};

	if (sourceWorld.version >= 140) {
		for (let i = readBoolean(byteBuffer); i; i = readBoolean(byteBuffer)) {
			const spriteId = sourceWorld.version >= 190 ? readInt32(byteBuffer) : 0;
			const spriteName = sourceWorld.version < 190 ? readString(byteBuffer) : "";
			const position = readCoordFloat(byteBuffer);

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
