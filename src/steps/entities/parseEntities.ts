import { readBoolean } from "../../worldDataSource/readBoolean";
import { readByte } from "../../worldDataSource/readByte";
import { readCoord16 } from "../../worldDataSource/readCoord16";
import { readInt16 } from "../../worldDataSource/readInt16";
import { readInt32 } from "../../worldDataSource/readInt32";
import { EntityType } from "../../enums/EntityType";
import type { Entity } from "../../types/Entity";
import type { ItemFrameEntity } from "../../types/ItemFrameEntity";
import type { LogicSensorEntity } from "../../types/LogicSensorEntity";
import type { ParseStep } from "../../types/ParseStep";
import type { TrainingDummyEntity } from "../../types/TrainingDummyEntity";
import type { WorldCurrent } from "../../types/Worlds/WorldCurrent";

type InputWorld = Pick<WorldCurrent, "version">;
type OutputWorld = Pick<WorldCurrent, "entities">;

export const parseEntities: ParseStep<InputWorld, OutputWorld> = (worldDataSource, sourceWorld) => {
	const world: OutputWorld = {
		entities: [],
	};

	if (sourceWorld.version >= 140) {
		const entityCount = readInt32(worldDataSource);
		for (let counter = 0; counter < entityCount; ++counter) {
			const type = readByte(worldDataSource) as EntityType;
			const id = readInt32(worldDataSource);
			const position = readCoord16(worldDataSource);

			const entity: Entity = {
				type,
				id,
				position,
			};

			switch (type) {
				case EntityType.TrainingDummy: {
					(entity as TrainingDummyEntity).npc = readInt16(worldDataSource);

					break;
				}

				case EntityType.ItemFrame: {
					const itemFrameEntity = entity as ItemFrameEntity;
					itemFrameEntity.itemId = readInt16(worldDataSource);
					itemFrameEntity.itemPrefix = readByte(worldDataSource);
					itemFrameEntity.itemStack = readInt16(worldDataSource);

					break;
				}

				case EntityType.LogicSensor: {
					const logicSensorEntity = entity as LogicSensorEntity;
					logicSensorEntity.sensorType = readByte(worldDataSource);
					logicSensorEntity.sensorOn = readBoolean(worldDataSource);

					break;
				}
				// No default
			}

			world.entities.push(entity);
		}
	}

	return world;
};
