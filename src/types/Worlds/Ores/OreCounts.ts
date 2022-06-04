import type { OreType } from "../../../enums/OreType";

export type OreCounts = Partial<{
	[key in OreType]: number;
}>;
