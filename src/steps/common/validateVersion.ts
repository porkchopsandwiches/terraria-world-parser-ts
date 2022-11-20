import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version" | "width" | "height" | "id" | "title">;

export const validateVersion = (minVersion: number, maxVersion: number): ParseStep<InputWorld, Record<string, unknown>> => {
	return (_, sourceWorld) => {
		if (sourceWorld.version < minVersion) {
			throw new Error(`Cannot currently parse worlds with a version less than ${minVersion}; this world has version ${sourceWorld.version}`);
		}

		if (sourceWorld.version > maxVersion) {
			throw new Error(`Cannot currently parse worlds with a version greater than ${maxVersion}; this world has version ${sourceWorld.version}`);
		}

		return {};
	};
};
