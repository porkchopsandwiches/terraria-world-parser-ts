import type { WorldBase } from "../types/Worlds/WorldBase";
import type { WorldV095 } from "../types/Worlds/WorldV095";
import type { WorldV099 } from "../types/Worlds/WorldV099";
import type { WorldV101 } from "../types/Worlds/WorldV101";
import type { WorldV104 } from "../types/Worlds/WorldV104";
import type { WorldV140 } from "../types/Worlds/WorldV140";
import type { WorldV141 } from "../types/Worlds/WorldV141";
import type { WorldV147 } from "../types/Worlds/WorldV147";
import type { WorldV170 } from "../types/Worlds/WorldV170";
import type { WorldV174 } from "../types/Worlds/WorldV174";
import type { WorldV178 } from "../types/Worlds/WorldV178";
import type { WorldV179 } from "../types/Worlds/WorldV179";
import type { WorldV181 } from "../types/Worlds/WorldV181";
import type { WorldV189 } from "../types/Worlds/WorldV189";
import type { WorldV192 } from "../types/Worlds/WorldV192";
import type { WorldV195 } from "../types/Worlds/WorldV195";
import type { WorldV196 } from "../types/Worlds/WorldV196";
import type { WorldV201 } from "../types/Worlds/WorldV201";
import type { WorldV204 } from "../types/Worlds/WorldV204";
import type { WorldV207 } from "../types/Worlds/WorldV207";
import type { WorldV208 } from "../types/Worlds/WorldV208";
import type { WorldV209 } from "../types/Worlds/WorldV209";
import type { WorldV210 } from "../types/Worlds/WorldV210";
import type { WorldV211 } from "../types/Worlds/WorldV211";
import type { WorldV212 } from "../types/Worlds/WorldV212";
import type { WorldV215 } from "../types/Worlds/WorldV215";
import type { WorldV216 } from "../types/Worlds/WorldV216";
import type { WorldV217 } from "../types/Worlds/WorldV217";
import type { WorldV222 } from "../types/Worlds/WorldV222";
import type { WorldV223 } from "../types/Worlds/WorldV223";
import type { WorldV227 } from "../types/Worlds/WorldV227";
import type { WorldV238 } from "../types/Worlds/WorldV238";
import type { WorldV239 } from "../types/Worlds/WorldV239";
import type { WorldV240 } from "../types/Worlds/WorldV240";
import type { WorldV241 } from "../types/Worlds/WorldV241";

type VersionMap = {
	95: WorldV095,
	99: WorldV099,
	101: WorldV101,
	104: WorldV104,
	140: WorldV140,
	141: WorldV141,
	147: WorldV147,
	170: WorldV170,
	174: WorldV174,
	178: WorldV178,
	179: WorldV179,
	181: WorldV181,
	189: WorldV189,
	192: WorldV192,
	195: WorldV195,
	196: WorldV196,
	201: WorldV201,
	204: WorldV204,
	207: WorldV207,
	208: WorldV208,
	209: WorldV209,
	210: WorldV210,
	211: WorldV211,
	212: WorldV212,
	215: WorldV215,
	216: WorldV216,
	217: WorldV217,
	222: WorldV222,
	223: WorldV223
	227: WorldV227,
	238: WorldV238
	239: WorldV239,
	240: WorldV240,
	241: WorldV241,
};

export const worldIsVersion = <TVersion extends keyof VersionMap>(world: WorldBase, version: TVersion): world is VersionMap[TVersion] => {
	return world.version >= version;
};