import { readBoolean } from "../../bufferReader/readBoolean";
import { readByte } from "../../bufferReader/readByte";
import { readCoord16 } from "../../bufferReader/readCoord16";
import { readInt16 } from "../../bufferReader/readInt16";
import { readInt32 } from "../../bufferReader/readInt32";
import { EntityType } from "../../enums/EntityType";
import type { Entity } from "../../types/Entity";
import type { ItemFrameEntity } from "../../types/ItemFrameEntity";
import type { LogicSensorEntity } from "../../types/LogicSensorEntity";
import type { ParseStep } from "../../types/ParseStep";
import type { TrainingDummyEntity } from "../../types/TrainingDummyEntity";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "entities">;

export const parseEntities: ParseStep<InputWorld, OutputWorld> = async (byteBuffer, sourceWorld) => {
	const world: OutputWorld = {
		entities: [],
	};

	if (sourceWorld.version >= 140) {
		const entityCount = readInt32(byteBuffer);
		for (let counter = 0; counter < entityCount; ++counter) {
			const type = readByte(byteBuffer) as EntityType;
			const id = readInt32(byteBuffer);
			const position = readCoord16(byteBuffer);

			const entity: Entity = {
				type,
				id,
				position
			};

			if (type === EntityType.TrainingDummy) {
				(entity as TrainingDummyEntity).npc = readInt16(byteBuffer);
			} else if (type === EntityType.ItemFrame) {
				const itemFrameEntity = entity as ItemFrameEntity;
				itemFrameEntity.itemId = readInt16(byteBuffer);
				itemFrameEntity.itemPrefix = readByte(byteBuffer);
				itemFrameEntity.itemStack = readInt16(byteBuffer);
			} else if (type === EntityType.LogicSensor) {
				const logicSensorEntity = entity as LogicSensorEntity;
				logicSensorEntity.sensorType = readByte(byteBuffer);
				logicSensorEntity.sensorOn = readBoolean(byteBuffer);
			}

			world.entities.push(entity);
		}
	}
	return world;
};
