import type { PlayerArmor } from "../../types/PlayerArmor";
import type { PlayerBase } from "../../types/Players/PlayerBase";
import type { RGB } from "../../types/RGB";
import type { WorldDataSource } from "../../types/WorldDataSource";
import { readBoolean } from "../../worldDataSource/readBoolean";
import { readBytes } from "../../worldDataSource/readBytes";
import { readFixedLengthString } from "../../worldDataSource/readFixedLengthString";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readInt8 } from "../../worldDataSource/readInt8";
import { readString } from "../../worldDataSource/readString";
import { readUInt32 } from "../../worldDataSource/readUInt32";
import type { ParseStep } from "../../types/ParseStep";

type InputData = Record<string, unknown>;
type OutputData = PlayerBase;

const readBitsByte = (size: number, dataSource: WorldDataSource) => {
	const bytes = [];
	for (let index = size; index > 0; index = index - 8) {
		bytes.push(readInt8(dataSource));
	}

	const bitValues = [];
	for (let index = 0, wrappedIndex = 0; index < size; index++, wrappedIndex++) {
		if (wrappedIndex == 8) {
			wrappedIndex = 0;
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		bitValues[index] = (bytes[Math.trunc(index / 8)]! & (1 << wrappedIndex)) > 0;
	}

	return bitValues;
};

const readPlayerArmor = (dataSource: WorldDataSource): PlayerArmor => {
	return {
		itemId: readInt32(dataSource),
		prefix: readInt8(dataSource),
	};
};

export const parsePlayerHeader: ParseStep<InputData, OutputData> = (dataSource) => {
	const player: Partial<OutputData> = {
		version: readUInt32(dataSource),
		magicString: readFixedLengthString(dataSource, 7),
		fileType: readInt8(dataSource),
		fileRevision: readUInt32(dataSource),
	};

	// Skip 7 bytes
	for (let index = 0; index < 7; index++) {
		readInt8(dataSource);
	}

	player.isFavourite = readBoolean(dataSource);
	player.name = readString(dataSource);
	player.difficulty = readInt8(dataSource);
	player.playTime = readBytes(8, dataSource);
	player.hairStyle = readUInt32(dataSource);
	player.hairDye = readInt8(dataSource);
	player.hideVisuals = readBitsByte(10, dataSource);
	player.hideMisc = readBitsByte(8, dataSource);
	player.skinVariant = readInt8(dataSource);
	player.statLife = readInt32(dataSource);
	player.statLifeMax = readInt32(dataSource);
	player.statMana = readInt32(dataSource);
	player.statManaMax = readInt32(dataSource);
	player.extraAccessory = readBoolean(dataSource);
	player.beatDD2EventAnyDifficulty = readBoolean(dataSource);
	player.taxMoney = readInt32(dataSource);
	player.hairColor = readBytes(3, dataSource) as RGB;
	player.skinColor = readBytes(3, dataSource) as RGB;
	player.eyeColor = readBytes(3, dataSource) as RGB;
	player.shirtColor = readBytes(3, dataSource) as RGB;
	player.underShirtColor = readBytes(3, dataSource) as RGB;
	player.pantsColor = readBytes(3, dataSource) as RGB;
	player.shoeColor = readBytes(3, dataSource) as RGB;

	player.armor = [];
	for (let index = 0; index < 20; index++) {
		player.armor.push(readPlayerArmor(dataSource));
	}

	player.dye = [];
	for (let index = 0; index < 10; index++) {
		player.dye.push(readPlayerArmor(dataSource));
	}

	console.log(player);

	return player as OutputData;
};
