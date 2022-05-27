import type { BeatenBossesV147 } from "./BeatenBosses/BeatenBossesV147";
import type { EventsV140 } from "./Events/EventsV140";
import type { Parties } from "./Parties";
import type { SavedNPCsV140 } from "./SavedNPCs/SavedNPCsV140";
import type { WorldV147 } from "./WorldV147";

export type WorldV170<
	TBeatenBosses extends BeatenBossesV147 = BeatenBossesV147,
	TSavedNPCs extends SavedNPCsV140 = SavedNPCsV140,
	TEvents extends EventsV140 = EventsV140
	> = WorldV147<TBeatenBosses, TSavedNPCs, TEvents> & {
	party: Parties;
}
