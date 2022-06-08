import { promises } from "node:fs";
import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { InterestingTileTypes } from "../../src/enums/InterestingTileTypes";
import { parse } from "../../src/steps/parse";
import { deriveInterestingTileType } from "../../src/steps/tiles/deriveInterestingTileType";
import { worldIsVersion } from "../../src/utils/worldIsVersion";

dotenv.config();

test("Parse works", async (t) => {
	t.timeout(100_000); // 100 milliseconds
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const world = await parse(byteBuffer, {
		interestingTileTypeEvaluator: deriveInterestingTileType,
	});

	if (worldIsVersion(world, 192)) {
		for (const interestingTileType of world.interestingTileCounts.keys()) {
			console.log(InterestingTileTypes[interestingTileType], world.interestingTileCounts.get(interestingTileType));
		}
	}

	// T.is(world.version, 248);
	t.is(world.fileRevision, 2);
	t.is(world.sectionPointers.length, 10);
});
