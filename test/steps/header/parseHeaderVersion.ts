import { promises } from "node:fs";
import test from "ava";
import * as dotenv from "dotenv";
import * as ByteBuffer from "bytebuffer";
import { parseHeaderVersion } from "../../../src/steps/header/parseHeaderVersion";

dotenv.config();

test("Parse version works", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const worldDataSource = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);
	const world = parseHeaderVersion(worldDataSource, {});

	t.is(world.version >= 95, true);
	t.is(world.version <= 248, true);
});
