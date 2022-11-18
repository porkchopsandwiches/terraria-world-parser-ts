import type { WorldDataSource } from "../types/WorldDataSource";
import type { ParseAggregateStep } from "../types/ParseAggregateStep";
import type { ParseStep } from "../types/ParseStep";
import { aggregateStep } from "./aggregateStep";

type GenericData = Record<string, unknown>;

type StepsAggregator<TInputData extends GenericData, TOutputData extends GenericData> = {
	add: <TNextOutputData extends GenericData>(nextStep: ParseStep<TOutputData, TNextOutputData>) => StepsAggregator<TInputData, TOutputData & TNextOutputData>;
	final: ParseAggregateStep<TInputData, TOutputData>;
};

type StepsAggregatorFactory = <TInputData extends GenericData, TOutputData extends GenericData>(firstStep: ParseStep<TInputData, TOutputData>) => StepsAggregator<TInputData, TOutputData>;

export const stepsAggregator: StepsAggregatorFactory = <TInputData extends GenericData, TOutputData extends GenericData>(firstStep: ParseStep<TInputData, TOutputData>) => {
	const steps: Array<ParseAggregateStep<GenericData, GenericData>> = [];
	steps.push(aggregateStep(firstStep) as ParseAggregateStep<GenericData, GenericData>);

	const aggregator: StepsAggregator<TInputData, TOutputData> = {
		add<TNextOutputData extends GenericData>(nextStep: ParseStep<TOutputData, TNextOutputData>): StepsAggregator<TInputData, TOutputData & TNextOutputData> {
			steps.push(aggregateStep(nextStep) as ParseAggregateStep<GenericData, GenericData>);
			return aggregator as never;
		},
		final(worldDataSource: Readonly<WorldDataSource>, sourceData: Readonly<TInputData>): TInputData & TOutputData {
			// Iterate through all steps as a pipeline
			const stepsToExecute = [...steps];
			let nextData: unknown = sourceData;
			while (stepsToExecute.length > 0) {
				const nextStep = stepsToExecute.shift();
				nextData = nextStep?.(worldDataSource, nextData as never);
			}

			return nextData as TInputData & TOutputData;
		},
	};

	return aggregator;
};
