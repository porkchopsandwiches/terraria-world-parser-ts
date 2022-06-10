import test from "ava";
import type { WorldDataSource } from "../../src/types/WorldDataSource";
import { readFloat32 } from "../../src/worldDataSource/readFloat32";

test("Read float works", (t) => {
	const floats = [32, 64, 0, 16];
	const worldDataSource: Pick<WorldDataSource, "readFloat32"> = {
		readFloat32: () => floats.shift() as number,
	};

	const originalFloats = [...floats];
	for (const float of originalFloats) {
		const result = readFloat32(worldDataSource);
		t.is(result, float / 16);
	}
});
