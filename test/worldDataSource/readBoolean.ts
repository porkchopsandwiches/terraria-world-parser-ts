import test from "ava";
import { readBoolean } from "../../src/worldDataSource/readBoolean";

test("Read boolean works", (t) => {
	const worldDataSource = {
		readUint8: () => 1_020_505,
	};
	const bool = readBoolean(worldDataSource);
	t.is(bool, true);
	worldDataSource.readUint8 = () => 0;
	const bool2 = readBoolean(worldDataSource);
	t.is(bool2, false);
});
