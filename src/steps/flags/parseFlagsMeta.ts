import { readBytes } from "../../worldDataSource/readBytes";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readRectangle32 } from "../../worldDataSource/readRectangle32";
import { readString } from "../../worldDataSource/readString";
import { readUInt32 } from "../../worldDataSource/readUInt32";
import type { WorldDataSource } from "../../types/WorldDataSource";
import type { ParseStep } from "../../types/ParseStep";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "title" | "id" | "frame" | "width" | "height"> & Partial<Pick<WorldCurrent, "seed" | "genVersion" | "guid">>;

const readV179Meta = (worldDataSource: Readonly<WorldDataSource>, sourceWorld: Readonly<InputWorld>): Partial<Pick<WorldCurrent, "seed" | "genVersion">> => {
	if (sourceWorld.version >= 179) {
		return {
			seed: readString(worldDataSource),
			genVersion: [readUInt32(worldDataSource), readUInt32(worldDataSource)],
		};
	}

	return {};
};

const readV181Meta = (worldDataSource: Readonly<WorldDataSource>, sourceWorld: Readonly<InputWorld>): Partial<Pick<WorldCurrent, "guid">> => {
	if (sourceWorld.version >= 181) {
		return {
			guid: readBytes(16, worldDataSource),
		};
	}

	return {};
};

export const parseFlagsMeta: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const title = readString(worldDataSource);
	const v179Meta = readV179Meta(worldDataSource, sourceWorld);
	const v181Meta = readV181Meta(worldDataSource, sourceWorld);
	const id = readInt32(worldDataSource);
	const frame = readRectangle32(worldDataSource);
	const height = readInt32(worldDataSource);
	const width = readInt32(worldDataSource);

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
