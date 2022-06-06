import type { EntityType } from "../enums/EntityType";
import type { Entity } from "./Entity";

export type LogicSensorEntity = Entity & {
	type: EntityType.LogicSensor;
	sensorType: number;
	sensorOn: boolean;
};
