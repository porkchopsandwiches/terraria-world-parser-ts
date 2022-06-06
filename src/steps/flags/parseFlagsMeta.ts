import { readBytes } from "../../bufferReader/readBytes";
import { readInt32 } from "../../bufferReader/readInt32";
import { readRectangle32 } from "../../bufferReader/readRectangle32";
import { readString } from "../../bufferReader/readString";
import { readUInt32 } from "../../bufferReader/readUInt32";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "title" | "id" | "frame" | "width" | "height"> & Partial<Pick<WorldCurrent, "seed" | "genVersion" | "guid">>

export const parseFlagsMeta: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {} as never;
	world.title = readString(byteBuffer);

	if (sourceWorld.version >= 179) {
		// world.seed = readInt32(byteBuffer).toString();
		world.seed = readString(byteBuffer);
		world.genVersion = [readUInt32(byteBuffer), readUInt32(byteBuffer)];
	}

	if (sourceWorld.version >= 181) {
		world.guid = readBytes(16, byteBuffer);
	}

	world.id = readInt32(byteBuffer);
	world.frame = readRectangle32(byteBuffer);
	world.height = readInt32(byteBuffer);
	world.width = readInt32(byteBuffer);
	return world;

};
