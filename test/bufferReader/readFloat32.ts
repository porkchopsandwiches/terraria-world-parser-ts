import test from "ava";
import { readFloat32 } from "../../src/bufferReader/readFloat32";

test("Read float works", (t) => {
	const floats = [32, 64, 0, 16];
	const byteBuffer = {
		readFloat32: () => floats.shift()!,
	};

	const originalFloats = [...floats];
	for (const float of originalFloats) {
		const result = readFloat32(byteBuffer);
		t.is(result, float / 16);
	}
});
