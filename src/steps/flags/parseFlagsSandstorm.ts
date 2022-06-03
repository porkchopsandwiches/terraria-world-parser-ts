import { readBoolean } from "../../bufferReader/readBoolean";
import { readFloat32 } from "../../bufferReader/readFloat32";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV174 } from "../../types/Worlds/WorldV174";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorldNewer = Pick<WorldV174, "sandstorm">;
type OutputWorld = Partial<OutputWorldNewer>;

export const parseFlagsSandstorm: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	if (sourceWorld.version >= 170) {
		const world: OutputWorldNewer = {} as never;
		world.sandstorm = {} as never;
		world.sandstorm.happening = readBoolean(byteBuffer);
		world.sandstorm.timeLeft = readInt32(byteBuffer);
		world.sandstorm.severity = readFloat32(byteBuffer);
		world.sandstorm.intendedSeverity = readFloat32(byteBuffer);
		return world;
	}

	return {};
};
