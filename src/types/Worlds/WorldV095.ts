import type { BeatenBosses } from "./BeatenBosses/BeatenBosses";
import type { Events } from "./Events/Events";
import type { SavedNPCs } from "./SavedNPCs/SavedNPCs";
import type { WorldBase } from "./WorldBase";

export type WorldV095<
	TBeatenBosses extends BeatenBosses = BeatenBosses,
	TSavedNPCs extends SavedNPCs = SavedNPCs,
	TEvents extends Events = Events
	> = WorldBase<TBeatenBosses, TSavedNPCs, TEvents> & {
	anglers: string[];
}
