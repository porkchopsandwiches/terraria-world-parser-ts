import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { promises } from "node:fs";
import { parseHeader } from "../../../src/steps/header/parseHeader";

dotenv.config();

test("Parse Header works", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const world = await parseHeader(byteBuffer, {});

	t.is(world.version, 248);
	t.is(world.fileRevision, 2);
	t.is(world.sectionPointers.length, 11);
});
