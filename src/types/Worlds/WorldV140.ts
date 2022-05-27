import type { NPC } from "../NPC";
import type { TileEntity } from "../TileEntity";
import type { BeatenBosses } from "./BeatenBosses/BeatenBosses";
import type { Events } from "./Events/Events";
import type { SavedNPCsV140 } from "./SavedNPCs/SavedNPCsV140";
import type { WorldV104 } from "./WorldV104";

export type WorldV140<
	TBeatenBosses extends BeatenBosses = BeatenBosses,
	TSavedNPCs extends SavedNPCsV140 = SavedNPCsV140,
	TEvents extends Events = Events
	> = WorldV104<TBeatenBosses, TSavedNPCs, TEvents> & {
	mobs: NPC[];
	fileRevision: number;
	invasionSizeStart: number;
	cultistDelay: number;
	numberOfMobs: number;
	killedMobs: number[];
	fastForwardTime: boolean;
	tileEntitiesNumber: number;
	tileEntities: TileEntity[];
}
