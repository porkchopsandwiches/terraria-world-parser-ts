import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { promises } from "node:fs";
import { InterestingTileTypes } from "../../src/enums/InterestingTileTypes";
import { parse } from "../../src/steps/parse";
import { deriveInterestingTileType } from "../../src/steps/tiles/deriveInterestingTileType";
import { worldIsVersion } from "../../src/utils/worldIsVersion";

dotenv.config();

test("Parse works", async (t) => {
	t.timeout(100000); // 100 milliseconds
	const fileBuffer = await promises.readFile(`${process.env["TEST_WORLD"]}`);
	const byteBuffer = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const world = await parse(byteBuffer, {
		interestingTileTypeEvaluator: deriveInterestingTileType
	});

	if (worldIsVersion(world, 192)) {
		for (const interestingTileType of world.interestingTileCounts.keys()) {
			console.log(InterestingTileTypes[interestingTileType], world.interestingTileCounts.get(interestingTileType));
		}
	}

	// t.is(world.version, 248);
	t.is(world.fileRevision, 2);
	t.is(world.sectionPointers.length, 10);
});
