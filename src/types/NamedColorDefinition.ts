import type { ItemDefinition } from "./ItemDefinition";

export type NamedColorDefinition = ItemDefinition & {
	color: number;
};
