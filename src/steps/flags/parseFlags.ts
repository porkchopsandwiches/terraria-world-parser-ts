import { stepsAggregator } from "../stepsAggregator";
import { parseFlagsMeta } from "./parseFlagsMeta";

export const parseFlags = stepsAggregator(parseFlagsMeta).final;
