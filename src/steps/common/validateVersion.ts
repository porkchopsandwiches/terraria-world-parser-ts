import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";

type InputWorld = Pick<WorldBase, "version" | "width" | "height" | "id" | "title">;

export const validateVersion = (minVersion = 95, maxVersion = 194): ParseStep<InputWorld, {}> => {
	return async (_, sourceWorld) => {
		if (sourceWorld.version < minVersion) {
			throw new Error(
				`Cannot currently parse worlds with a version less than ${minVersion}; this world has version ${sourceWorld.version}`,
			);
		}

		if (sourceWorld.version > maxVersion) {
			throw new Error(
				`Cannot currently parse worlds with a version greater than ${maxVersion}; this world has version ${sourceWorld.version}`,
			);
		}
		return {};
	};
};
