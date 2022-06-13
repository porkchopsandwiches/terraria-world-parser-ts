import type { ParseAggregateStep } from "../types/ParseAggregateStep";
import type { ParseStep } from "../types/ParseStep";

export const aggregateStep = <TInputWorld extends Record<string, unknown>, TOutputWorld extends Record<string, unknown>>(step: ParseStep<TInputWorld, TOutputWorld>): ParseAggregateStep<TInputWorld, TOutputWorld> => {
	return (worldDataSource, inputWorld) => {
		const outputWorld = step(worldDataSource, inputWorld);
		return { ...inputWorld, ...outputWorld };
	};
};
