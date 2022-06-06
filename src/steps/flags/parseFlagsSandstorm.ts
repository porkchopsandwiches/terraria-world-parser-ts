import { readBoolean } from "../../bufferReader/readBoolean";
import { readFloat32 } from "../../bufferReader/readFloat32";
import { readInt32 } from "../../bufferReader/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Partial<Pick<WorldCurrent, "sandstormSeverity" | "sandstormIntendedSeverity" | "sandstormHappening" | "sandstormTimeLeft">>;

export const parseFlagsSandstorm: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {};
	if (sourceWorld.version >= 170) {
		world.sandstormHappening = readBoolean(byteBuffer);
		world.sandstormTimeLeft = readInt32(byteBuffer);
		world.sandstormSeverity = readFloat32(byteBuffer);
		world.sandstormIntendedSeverity = readFloat32(byteBuffer);
	}

	return world;
};
