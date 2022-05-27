import type { BeatenBossesV147 } from "./BeatenBosses/BeatenBossesV147";
import type { EventsV140 } from "./Events/EventsV140";
import type { SavedNPCsV178 } from "./SavedNPCs/SavedNPCsV178";
import type { WorldV181 } from "./WorldV181";

export type WorldV192<
	TBeatenBosses extends BeatenBossesV147 = BeatenBossesV147,
	TSavedNPCs extends SavedNPCsV178 = SavedNPCsV178,
	TEvents extends EventsV140 = EventsV140
	> = WorldV181<TBeatenBosses, TSavedNPCs, TEvents> & {

}
