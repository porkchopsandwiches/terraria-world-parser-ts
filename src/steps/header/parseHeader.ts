import { stepsAggregator } from "../stepsAggregator";
import { parseHeaderExtras } from "./parseHeaderExtras";
import { parseHeaderSectionPointers } from "./parseHeaderSectionPointers";
import { parseHeaderTileFrameImportance } from "./parseHeaderTileFrameImportance";
import { parseHeaderVersion } from "./parseHeaderVersion";

export const parseHeader = stepsAggregator(parseHeaderVersion).add(parseHeaderExtras).add(parseHeaderSectionPointers).add(parseHeaderTileFrameImportance).final;
