import type { WorldV210 } from "./WorldV210";

export type WorldV211<TInterestingTypes extends number = number> = WorldV210<TInterestingTypes> & {
	treeTopCount: number;
	treeTops: number[];
};
