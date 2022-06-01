import { readBytes } from "../../bufferReader/readBytes";
import { readInt32 } from "../../bufferReader/readInt32";
import { readRectangle32 } from "../../bufferReader/readRectangle32";
import { readString } from "../../bufferReader/readString";
import { readUInt32 } from "../../bufferReader/readUInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldBase } from "../../types/Worlds/WorldBase";
import type { WorldV178 } from "../../types/Worlds/WorldV178";
import type { WorldV181 } from "../../types/Worlds/WorldV181";

type InputWorld = Pick<WorldBase, "version">;
type OutputWorldNewer = Pick<WorldV181, "title" | "seed" | "genVersion" | "guid" | "id" | "frame" | "width" | "height">;
type OutputWorldOlder = Pick<WorldV178, "title" | "id" | "frame" | "width" | "height">;
type OutputWorld = OutputWorldNewer | OutputWorldOlder;

export const parseFlagsMeta: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {
		title: "",
		seed: "",
		id: 0,
		frame: { left: NaN, right: NaN, bottom: NaN, top: NaN },
		width: NaN,
		height: NaN,
	};
	world.title = readString(byteBuffer);

	if (sourceWorld.version >= 179) {
		if (sourceWorld.version === 179) {
			(world as OutputWorldNewer).seed = readInt32(byteBuffer).toString();
		} else {
			(world as OutputWorldNewer).seed = readString(byteBuffer);
		}
		(world as OutputWorldNewer).genVersion = [readUInt32(byteBuffer), readUInt32(byteBuffer)];
	} else {
		(world as OutputWorldNewer).seed = "";
	}

	if (sourceWorld.version >= 181) {
		(world as OutputWorldNewer).guid = readBytes(16, byteBuffer);
	}

	world.id = readInt32(byteBuffer);
	world.frame = readRectangle32(byteBuffer);
	world.height = readInt32(byteBuffer);
	world.width = readInt32(byteBuffer);
	return world;

};
