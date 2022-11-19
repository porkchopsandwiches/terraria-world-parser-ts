import type { PlayerArmor } from "../../types/PlayerArmor";
import type { PlayerBase } from "../../types/Players/PlayerBase";
import type { PlayerCurrent } from "../../types/Players/PlayerCurrent";
import type { RGB } from "../../types/RGB";
import type { WorldDataSource } from "../../types/WorldDataSource";
import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readBytes } from "../../worldDataSource/readBytes";
import { readFixedLengthString } from "../../worldDataSource/readFixedLengthString";
import { readInt32 } from "../../worldDataSource/readInt32";
import { readInt8 } from "../../worldDataSource/readInt8";
import { readString } from "../../worldDataSource/readString";
import { readUInt32 } from "../../worldDataSource/readUInt32";
import type { ParseStep } from "../../types/ParseStep";

type InputData = Record<string, unknown>;
type OutputData = PlayerBase & Partial<PlayerCurrent>;

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
	const version = readUInt32(dataSource);
	const player: Partial<OutputData> = {
		version,
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

	if (version >= 229) {
		player.unlockedBiomeTorches = readBoolean(dataSource);
		player.usingBiomeTorches = readBoolean(dataSource);
	}
	if (version >= 256) {
		player.ateArtisanBread = readBoolean(dataSource);
	}
	if (version >= 260) {
		player.usedAegisCrystal = readBoolean(dataSource);
		player.usedAegisFruit = readBoolean(dataSource);
		player.usedArcaneCrystal = readBoolean(dataSource);
		player.usedGalaxyPearl = readBoolean(dataSource);
		player.usedGummyWorm = readBoolean(dataSource);
		player.usedAmbrosia = readBoolean(dataSource);
	}

	player.beatDD2EventAnyDifficulty = readBoolean(dataSource);
	player.taxMoney = readInt32(dataSource);

	if (version >= 254) {
		player.numberOfDeathsPVE = readInt32(dataSource);
		player.numberOfDeathsPVP = readInt32(dataSource);
	}

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

	player.inventory = [];
	for (let index = 0; index < 58; index++) {
		const id = readInt32(dataSource);
		if (id >= 3930) {
			player.inventory[index] = {
				id: 0,
				prefix: 0,
				stack: 0,
			};
			readInt32(dataSource);
			readInt8(dataSource);
			if (version >= 114) {
				readBoolean(dataSource);
			}
		} else {
			player.inventory[index] = {
				id,
				stack: readInt32(dataSource),
				prefix: readByte(dataSource),
				favourited: version >= 114 ? readBoolean(dataSource) : undefined,
			};
		}
	}

	console.log(player);

	return player as OutputData;
};
