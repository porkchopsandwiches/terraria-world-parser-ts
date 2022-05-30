import test from "ava";
import * as dotenv from "dotenv";
import * as ByteBuffer from "bytebuffer";
import { promises } from "node:fs";
import { parseHeaderExtras } from "../../src/steps/parseHeaderExtras";
import { parseVersion } from "../../src/steps/parseVersion";

dotenv.config();

test("Parse header extras", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);
	const sourceWorld = await parseVersion(byteBuffer, {});
	const world = await parseHeaderExtras(byteBuffer, sourceWorld);

	t.is(world.fileRevision, 2);
});
