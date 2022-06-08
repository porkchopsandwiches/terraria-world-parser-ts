import test from "ava";
import { readBoolean } from "../../src/bufferReader/readBoolean";

test("Read boolean works", (t) => {
	const byteBuffer = {
		readUint8: () => 1_020_505,
	};
	const bool = readBoolean(byteBuffer);
	t.is(bool, true);
	byteBuffer.readUint8 = () => 0;
	const bool2 = readBoolean(byteBuffer);
	t.is(bool2, false);
});
