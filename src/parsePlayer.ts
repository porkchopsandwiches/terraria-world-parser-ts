import { parsePlayerHeader } from "./steps/player/parsePlayerHeader";
import { stepsAggregator } from "./steps/stepsAggregator";
import type { PlayerBase } from "./types/Players/PlayerBase";
import type { WorldDataSource } from "./types/WorldDataSource";

/**
 * Take a World Data Source and read a World from it.
 *
 * If no error is thrown, guarantees that the World returned will fulfill AT LEAST the WorldBase contract, and as much of the WorldCurrent contract as is present in the data, depending on the World version.
 *
 * @param {WorldDataSource} dataSource						The Data Source object.
 *
 * @returns {PlayerBase}
 */
export const parsePlayer = (dataSource: WorldDataSource): PlayerBase => {
	// Header
	const parser = stepsAggregator(parsePlayerHeader).final;

	return parser(dataSource, {});
};
