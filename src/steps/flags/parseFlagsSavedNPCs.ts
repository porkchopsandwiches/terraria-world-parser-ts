import { readBoolean } from "../../worldDataSource/readBoolean";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "savedGoblin" | "savedWizard" | "savedMech">;

export const parseFlagsSavedNPCs: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
	return {
		savedGoblin: readBoolean(worldDataSource),
		savedWizard: readBoolean(worldDataSource),
		savedMech: readBoolean(worldDataSource),
	};
};
