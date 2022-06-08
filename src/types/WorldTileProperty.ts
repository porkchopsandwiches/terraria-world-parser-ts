import type { Coordinate } from "./Coordinate";

export type WorldTileProperty = {
	color: number;
	id: number;
	name: string;
	is_framed: boolean;
	frame_size: Coordinate;
	// Frames: any;
	is_solid: boolean;
	is_solid_top: boolean;
	is_light: boolean;
	// Placement: any;
	// texture_grid: any;
	is_grass: boolean;
	is_platform: boolean;
	is_cactus: boolean;
	is_stone: boolean;
	can_blend: boolean;
	merge_with: number;
};
