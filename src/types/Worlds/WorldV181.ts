import type { BeatenBossesV147 } from "./BeatenBosses/BeatenBossesV147";
import type { EventsV140 } from "./Events/EventsV140";
import type { SavedNPCsV178 } from "./SavedNPCs/SavedNPCsV178";
import type { WorldV179 } from "./WorldV179";

export type WorldV181<
	TBeatenBosses extends BeatenBossesV147 = BeatenBossesV147,
	TSavedNPCs extends SavedNPCsV178 = SavedNPCsV178,
	TEvents extends EventsV140 = EventsV140
	> = WorldV179<TBeatenBosses, TSavedNPCs, TEvents> & {
	guid: number[];
}
