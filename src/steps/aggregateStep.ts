import type { ParseAggregateStep } from "../types/ParseAggregateStep";
import type { ParseStep } from "../types/ParseStep";

export const aggregateStep = <TInputWorld extends Record<string, unknown>, TOutputWorld extends Record<string, unknown>>(step: ParseStep<TInputWorld, TOutputWorld>): ParseAggregateStep<TInputWorld, TOutputWorld> => {
	return async (byteBuffer, inputWorld) => {
		const outputWorld = await step(byteBuffer, inputWorld);
		return { ...inputWorld, ...outputWorld };
	};
};
