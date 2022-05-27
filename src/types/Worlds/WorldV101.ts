import type { BeatenBosses } from "./BeatenBosses/BeatenBosses";
import type { Events } from "./Events/Events";
import type { SavedNPCsV099 } from "./SavedNPCs/SavedNPCsV099";
import type { WorldV099 } from "./WorldV099";

export type WorldV101<
	TBeatenBosses extends BeatenBosses = BeatenBosses,
	TSavedNPCs extends SavedNPCsV099 = SavedNPCsV099,
	TEvents extends Events = Events
	> = WorldV099<TBeatenBosses, TSavedNPCs, TEvents> & {
	anglerQuest: number;
}
