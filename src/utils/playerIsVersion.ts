import type { PlayerBase } from "../types/Players/PlayerBase";
import type { PlayerV229 } from "../types/Players/PlayerV229";
import type { PlayerV256 } from "../types/Players/PlayerV256";
import type { PlayerV260 } from "../types/Players/PlayerV260";

type VersionMap = {
	229: PlayerV229;
	256: PlayerV256;
	260: PlayerV260;
};

export const playerIsVersion = <TVersion extends keyof VersionMap>(player: PlayerBase, version: TVersion): player is VersionMap[TVersion] => {
	return player.version >= version;
};
