import type { Coordinate } from "./Coordinate";

export type TileEntity = {
	type: number;
	id: number;
	position: Coordinate;
	pc: number;
	itemNetId: number;
	prefix: number;
	stack: number;
};
