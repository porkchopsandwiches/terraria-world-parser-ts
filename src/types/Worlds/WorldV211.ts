import type { WorldV210 } from "./WorldV210";

export type WorldV211 = WorldV210 & {
	treeTopCount: number;
	treeTops: number[];
}
