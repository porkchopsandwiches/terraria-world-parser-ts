import { readBoolean } from "../../bufferReader/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "savedGoblin" | "savedWizard" | "savedMech">;

export const parseFlagsSavedNPCs: ParseStep<InputWorld, OutputWorld> = async (byteBuffer) => {
	return {
		savedGoblin: readBoolean(byteBuffer),
		savedWizard: readBoolean(byteBuffer),
		savedMech: readBoolean(byteBuffer),
	};
};
