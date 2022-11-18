import { promises } from "node:fs";
import test from "ava";
import * as ByteBuffer from "bytebuffer";
import * as dotenv from "dotenv";
import { ModeOfOperation } from "aes-js";
import { parsePlayer } from "../src/parsePlayer";

dotenv.config();

test("Parse player works", async (t) => {
	t.timeout(100_000); // 100 milliseconds
	const fileBuffer = await promises.readFile(`${process.env["TEST_PLAYER"]}`);
	const key = new Uint8Array([104, 0, 51, 0, 121, 0, 95, 0, 103, 0, 85, 0, 121, 0, 90, 0]);
	const cbc = new ModeOfOperation.cbc(key, key);
	const decryptedBuffer = cbc.decrypt(new Uint8Array(fileBuffer));
	const playerDataSource = ByteBuffer.wrap(decryptedBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

	const player = parsePlayer(playerDataSource);

	t.is(player.fileRevision, 0);
	t.is(player.magicString, "relogic");
});
