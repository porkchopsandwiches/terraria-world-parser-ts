import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = {};
type OutputWorld = Pick<WorldBase, "savedGoblin" | "savedWizard" | "savedMech">;

export const parseFlagsSavedNPCs: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	const world: OutputWorld = {} as never;
	world.savedGoblin = readBoolean(byteBuffer);
	world.savedWizard = readBoolean(byteBuffer);
	world.savedMech = readBoolean(byteBuffer);
	return world;
};
