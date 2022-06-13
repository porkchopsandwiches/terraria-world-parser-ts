import { promises } from "node:fs";
import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { parseWorld } from "../src/parseWorld";
import { deriveInterestingTileType } from "../src/steps/tiles/deriveInterestingTileType";

dotenv.config();

test("Parse works", async (t) => {
	t.timeout(100_000); // 100 milliseconds
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const worldDataSource = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const world = parseWorld(worldDataSource, {
		interestingTileTypeEvaluator: deriveInterestingTileType,
	});

	t.is(world.fileRevision, 2);
	t.is(world.sectionPointers.length >= 10, true);
	t.is(world.chests.length > 0, true);
});
