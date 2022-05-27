import type { Sandstorm } from "../Sandstorm";
import type { BeatenBossesV147 } from "./BeatenBosses/BeatenBossesV147";
import type { EventsV140 } from "./Events/EventsV140";
import type { SavedNPCsV140 } from "./SavedNPCs/SavedNPCsV140";
import type { WorldV170 } from "./WorldV170";

export type WorldV174<
	TBeatenBosses extends BeatenBossesV147 = BeatenBossesV147,
	TSavedNPCs extends SavedNPCsV140 = SavedNPCsV140,
	TEvents extends EventsV140 = EventsV140
	> = WorldV170<TBeatenBosses, TSavedNPCs, TEvents> & {
	sandstorm: Sandstorm;
}
