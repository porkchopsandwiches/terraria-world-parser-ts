import type { ByteBuffer } from "../types/ByteBuffer";
import type { ParseAggregateStep } from "../types/ParseAggregateStep";
import type { ParseStep } from "../types/ParseStep";
import { aggregateStep } from "./aggregateStep";

type GenericWorldData = Record<string, unknown>;

type StepsAggregator<TInputWorld extends GenericWorldData, TOutputWorld extends GenericWorldData> = {
	add: <TNextOutputWorld extends GenericWorldData>(nextStep: ParseStep<TOutputWorld, TNextOutputWorld>) => StepsAggregator<TInputWorld, TOutputWorld & TNextOutputWorld>;
	final: ParseAggregateStep<TInputWorld, TOutputWorld>;
};

type StepsAggregatorFactory = <TInputWorld extends GenericWorldData, TOutputWorld extends GenericWorldData>(firstStep: ParseStep<TInputWorld, TOutputWorld>) => StepsAggregator<TInputWorld, TOutputWorld>;

export const stepsAggregator: StepsAggregatorFactory = <TInputWorld extends GenericWorldData, TOutputWorld extends GenericWorldData>(firstStep: ParseStep<TInputWorld, TOutputWorld>) => {

	const steps: ParseAggregateStep<GenericWorldData, GenericWorldData>[] = [];
	steps.push(aggregateStep(firstStep) as ParseAggregateStep<GenericWorldData, GenericWorldData>);

	const stepsAggregatorInner = (): StepsAggregator<TInputWorld, TOutputWorld> => {

		const aggregator: StepsAggregator<TInputWorld, TOutputWorld> = {} as never;

		aggregator.add = <TNextOutputWorld extends GenericWorldData>(nextStep: ParseStep<TOutputWorld, TNextOutputWorld>): StepsAggregator<TInputWorld, TOutputWorld & TNextOutputWorld> => {
			steps.push(aggregateStep(nextStep) as ParseAggregateStep<GenericWorldData, GenericWorldData>);
			return aggregator as never;
		};

		aggregator.final = async (byteBuffer: Readonly<ByteBuffer>, sourceWorld: Readonly<TInputWorld>): Promise<TInputWorld & TOutputWorld> => {
			// Iterate through all steps as a pipeline
			const stepsToExecute = [...steps];
			let nextWorld: unknown = sourceWorld;
			while (stepsToExecute.length > 0) {
				const nextStep = stepsToExecute.shift();
				nextWorld = await nextStep?.(byteBuffer, nextWorld as never);
			}
			return nextWorld as TInputWorld & TOutputWorld;
		};

		return aggregator;
	};

	return stepsAggregatorInner();
};