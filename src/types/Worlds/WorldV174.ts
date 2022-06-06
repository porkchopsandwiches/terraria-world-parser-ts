import type { WorldV170 } from "./WorldV170";

export type WorldV174 = WorldV170 & {
	sandstormHappening: boolean;
	sandstormTimeLeft: number;
	sandstormSeverity: number;
	sandstormIntendedSeverity: number;
}
