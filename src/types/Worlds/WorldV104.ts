import type { BeatenBosses } from "./BeatenBosses/BeatenBosses";
import type { Events } from "./Events/Events";
import type { SavedNPCsV104 } from "./SavedNPCs/SavedNPCsV104";
import type { WorldV101 } from "./WorldV101";

export type WorldV104<
	TBeatenBosses extends BeatenBosses = BeatenBosses,
	TSavedNPCs extends SavedNPCsV104 = SavedNPCsV104,
	TEvents extends Events = Events
	> = WorldV101<TBeatenBosses, TSavedNPCs, TEvents> & {
}
