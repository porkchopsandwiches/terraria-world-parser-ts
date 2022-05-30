import test from "ava";
import * as dotenv from "dotenv";
import * as ByteBuffer from "bytebuffer";
import { promises } from "node:fs";
import { parseHeaderExtras } from "../../src/steps/parseHeaderExtras";
import { parseVersion } from "../../src/steps/parseVersion";
import { stepsAggregator } from "../../src/steps/stepsAggregator";

dotenv.config();

test("Steps Aggregator aggregates", async (t) => {
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const steps = stepsAggregator(parseVersion).add(parseHeaderExtras).final;

	const world = await steps(byteBuffer, {});

	t.is(world.version, 248);
	t.is(world.fileRevision, 2);
});
