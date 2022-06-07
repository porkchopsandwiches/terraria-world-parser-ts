import test from "ava";
import * as dotenv from "dotenv";
import * as ByteBuffer from "bytebuffer";
import { promises } from "node:fs";
import { parseHeaderVersion } from "../../../src/steps/header/parseHeaderVersion";

dotenv.config();

test("Parse version works", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);
	const world = await parseHeaderVersion(byteBuffer, {});

	t.is(true, world.version >= 95);
	t.is(true, world.version <= 241);
});
