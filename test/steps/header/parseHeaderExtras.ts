import { promises } from "node:fs";
import test from "ava";
import * as dotenv from "dotenv";
import * as ByteBuffer from "bytebuffer";
import { parseHeaderExtras } from "../../../src/steps/header/parseHeaderExtras";
import { parseHeaderVersion } from "../../../src/steps/header/parseHeaderVersion";

dotenv.config();

test("Parse header extras", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const worldDataSource = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);
	const sourceWorld = parseHeaderVersion(worldDataSource, {});
	const world = parseHeaderExtras(worldDataSource, sourceWorld);

	t.is(world.fileRevision, 2);
});
