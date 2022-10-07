import type { WorldV250 } from "./WorldV250";

export type WorldV251<TInterestingTypes extends number = number> = WorldV250<TInterestingTypes> & {
	unlockedMerchantSpawn: boolean;
	unlockedDemolitionistSpawn: boolean;
	unlockedPartyGirlSpawn: boolean;
	unlockedDyeTraderSpawn: boolean;
	unlockedTruffleSpawn: boolean;
	unlockedArmsDealerSpawn: boolean;
	unlockedNurseSpawn: boolean;
	unlockedPrincessSpawn: boolean;
};
