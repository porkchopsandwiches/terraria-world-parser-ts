import type { GameMode } from "../../enums/GameMode";
import type { WorldV208 } from "./WorldV208";

export type WorldV209<TInterestingTypes extends number = number> = WorldV208<TInterestingTypes> & {
	gameMode: GameMode;
}
