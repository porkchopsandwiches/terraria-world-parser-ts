import type { NamedColorDefinition } from "./NamedColorDefinition";

export type WallDefinition = NamedColorDefinition & {
	blend: number;
};
