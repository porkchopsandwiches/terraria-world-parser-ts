import type { ParserPointer } from "../enums/ParserPointer";
import type { TileData } from "./TileData";

export type ParseConfig<TInterestingTypes extends number = number> = {
	onSectionParsed: (pointer: ParserPointer) => void;
	interestingTileTypeEvaluator: (tileData: TileData) => TInterestingTypes | undefined;
};
