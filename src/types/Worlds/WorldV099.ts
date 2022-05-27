import type { BeatenBosses } from "./BeatenBosses/BeatenBosses";
import type { Events } from "./Events/Events";
import type { SavedNPCsV099 } from "./SavedNPCs/SavedNPCsV099";
import type { WorldV095 } from "./WorldV095";

export type WorldV099<
	TBeatenBosses extends BeatenBosses = BeatenBosses,
	TSavedNPCs extends SavedNPCsV099 = SavedNPCsV099,
	TEvents extends Events = Events
	> = WorldV095<TBeatenBosses, TSavedNPCs, TEvents> & {
}
