import type { WorldV216 } from "./WorldV216";

export type WorldV217<TInterestingTypes extends number = number> = WorldV216<TInterestingTypes> & {
	boughtCat: boolean;
	boughtDog: boolean;
	boughtBunny: boolean;
}
