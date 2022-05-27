import type { BeatenBossesV147 } from "./BeatenBosses/BeatenBossesV147";
import type { EventsV140 } from "./Events/EventsV140";
import type { SavedNPCsV140 } from "./SavedNPCs/SavedNPCsV140";
import type { WorldV140 } from "./WorldV140";

export type WorldV147<
	TBeatenBosses extends BeatenBossesV147 = BeatenBossesV147,
	TSavedNPCs extends SavedNPCsV140 = SavedNPCsV140,
	TEvents extends EventsV140 = EventsV140
	> = WorldV140<TBeatenBosses, TSavedNPCs, TEvents> & {
	expertMode: boolean;
	creationTime: number[];
	slimeRainTime: number;
	sundialCooldown: number;
}
