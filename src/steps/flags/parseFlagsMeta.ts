import { readBytes } from "../../bufferReader/readBytes";
import { readInt32 } from "../../bufferReader/readInt32";
import { readRectangle32 } from "../../bufferReader/readRectangle32";
import { readString } from "../../bufferReader/readString";
import { readUInt32 } from "../../bufferReader/readUInt32";
import type { ByteBuffer } from "../../types/ByteBuffer";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "title" | "id" | "frame" | "width" | "height"> & Partial<Pick<WorldCurrent, "seed" | "genVersion" | "guid">>;

const readV179Meta = (byteBuffer: Readonly<ByteBuffer>, sourceWorld: Readonly<InputWorld>): Partial<Pick<WorldCurrent, "seed" | "genVersion">> => {
	if (sourceWorld.version >= 179) {
		return {
			seed: readString(byteBuffer),
			genVersion: [readUInt32(byteBuffer), readUInt32(byteBuffer)],
		};
	}

	return {};
};

const readV181Meta = (byteBuffer: Readonly<ByteBuffer>, sourceWorld: Readonly<InputWorld>): Partial<Pick<WorldCurrent, "guid">> => {
	if (sourceWorld.version >= 181) {
		return {
			guid: readBytes(16, byteBuffer),
		};
	}

	return {};
};

export const parseFlagsMeta: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const title = readString(byteBuffer);
	const v179Meta = readV179Meta(byteBuffer, sourceWorld);
	const v181Meta = readV181Meta(byteBuffer, sourceWorld);
	const id = readInt32(byteBuffer);
	const frame = readRectangle32(byteBuffer);
	const height = readInt32(byteBuffer);
	const width = readInt32(byteBuffer);

	return {
		title,
		id,
		frame,
		height,
		width,
		...v179Meta,
		...v181Meta,
	};
};
