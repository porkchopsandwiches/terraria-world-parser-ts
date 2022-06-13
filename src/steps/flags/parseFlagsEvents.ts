import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readFloat64 } from "../../worldDataSource/readFloat64";
import { readInt32 } from "../../worldDataSource/readInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Record<string, unknown>;
type OutputWorld = Pick<WorldCurrent, "beatClown" | "beatInvasionGoblins" | "beatInvasionFrostLegion" | "beatInvasionPirates" | "shadowOrbSmashed" | "spawnMeteor" | "shadowOrbCount" | "altarCount" | "hardMode" | "invasionDelay" | "invasionSize" | "invasionType" | "invasionX">;

export const parseFlagsEvents: ParseStep<InputWorld, OutputWorld> = (worldDataSource) => {
	return {
		beatInvasionGoblins: readBoolean(worldDataSource),
		beatClown: readBoolean(worldDataSource),
		beatInvasionFrostLegion: readBoolean(worldDataSource),
		beatInvasionPirates: readBoolean(worldDataSource),

		shadowOrbSmashed: readBoolean(worldDataSource),
		spawnMeteor: readBoolean(worldDataSource),
		shadowOrbCount: readByte(worldDataSource),
		altarCount: readInt32(worldDataSource),
		hardMode: readBoolean(worldDataSource),
		invasionDelay: readInt32(worldDataSource),
		invasionSize: readInt32(worldDataSource),
		invasionType: readInt32(worldDataSource),
		invasionX: readFloat64(worldDataSource),
	};
};
