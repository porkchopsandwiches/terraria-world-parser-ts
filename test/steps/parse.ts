import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { promises } from "node:fs";
import { parse } from "../../src/steps/parse";
import type { WorldBase } from "../../src/types/Worlds/WorldBase";
import type { WorldCurrent } from "../../src/types/Worlds/WorldCurrent";
import { worldIsVersion } from "../../src/utils/worldIsVersion";

dotenv.config();

test("Parse works", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const world: WorldBase & Partial<WorldCurrent> = await parse(byteBuffer, {});

	if (worldIsVersion(world, 201)) {
		console.log(world.savedGolfer);
	}



	t.is(world.version, 248);
	t.is(world.fileRevision, 2);
	t.is(world.sectionPointers.length, 11);
});
