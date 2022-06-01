import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { promises } from "node:fs";
import { parseFlags } from "../../src/steps/flags/parseFlags";
import { parseHeader } from "../../src/steps/header/parseHeader";

dotenv.config();

test("Steps Aggregator aggregates", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const worldAfterParsedHeader = await parseHeader(byteBuffer, {});
	const world = await parseFlags(byteBuffer, worldAfterParsedHeader);

	t.is(world.version, 248);
	t.is(world.width, 4200);
	t.is(world.height, 1200);
});
