import test from "ava";
import * as dotenv from "dotenv";
import * as ByteBuffer from "bytebuffer";
import { promises } from "node:fs";
import { parseVersion } from "../../src/steps/parseVersion";

dotenv.config();

test("Parse version works", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);
	const world = await parseVersion(byteBuffer, {});

	t.is(world.version, 248);
});
