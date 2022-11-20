import { ParserPointer } from "./enums/ParserPointer";
import type { WorldDataSource } from "./types/WorldDataSource";
import type { ParseConfig } from "./types/ParseConfig";
import type { WorldBase } from "./types/Worlds/WorldBase";
import type { WorldCurrent } from "./types/Worlds/WorldCurrent";
import { parseBestiaryChatted } from "./steps/bestiary/parseBestiaryChatted";
import { parseBestiaryKills } from "./steps/bestiary/parseBestiaryKills";
import { parseBestiarySeen } from "./steps/bestiary/parseBestiarySeen";
import { parseChests } from "./steps/chests/parseChests";
import { conditionallyValidateOffset } from "./steps/common/conditionallyValidateOffset";
import { validateOffset } from "./steps/common/validateOffset";
import { validateVersion } from "./steps/common/validateVersion";
import { parseEntities } from "./steps/entities/parseEntities";
import { parseFlagsAnglerQuest } from "./steps/flags/parseFlagsAnglerQuest";
import { parseFlagsAnglers } from "./steps/flags/parseFlagsAnglers";
import { parseFlagsAttributes } from "./steps/flags/parseFlagsAttributes";
import { parseFlagsBeatenBosses } from "./steps/flags/parseFlagsBeatenBosses";
import { parseFlagsEnvironment } from "./steps/flags/parseFlagsEnvironment";
import { parseFlagsEvents } from "./steps/flags/parseFlagsEvents";
import { parseFlagsExtras } from "./steps/flags/parseFlagsExtras";
import { parseFlagsMeta } from "./steps/flags/parseFlagsMeta";
import { parseFlagsParty } from "./steps/flags/parseFlagsParty";
import { parseFlagsSandstorm } from "./steps/flags/parseFlagsSandstorm";
import { parseFlagsSavedAngler } from "./steps/flags/parseFlagsSavedAngler";
import { parseFlagsSavedNPCs } from "./steps/flags/parseFlagsSavedNPCs";
import { parseFlagsSavedStylist } from "./steps/flags/parseFlagsSavedStylist";
import { parseFlagsSlimeRainAndSundial } from "./steps/flags/parseFlagsSlimeRainAndSundial";
import { parseFlagsStyles } from "./steps/flags/parseFlagsStyles";
import { parseFlagsV140Events } from "./steps/flags/parseFlagsV140Events";
import { parseFlagsV178Events } from "./steps/flags/parseFlagsV178Events";
import { parseFlagsWorldModes } from "./steps/flags/parseFlagsWorldModes";
import { parseHeaderExtras } from "./steps/header/parseHeaderExtras";
import { parseHeaderSectionPointers } from "./steps/header/parseHeaderSectionPointers";
import { parseHeaderTileFrameImportance } from "./steps/header/parseHeaderTileFrameImportance";
import { parseHeaderVersion } from "./steps/header/parseHeaderVersion";
import { parseHomelessNPCs } from "./steps/npcs/parseHomelessNPCs";
import { parseNPCs } from "./steps/npcs/parseNPCs";
import { parsePressurePlates } from "./steps/pressurePlates/parsePressurePlates";
import { parseSigns } from "./steps/signs/parseSigns";
import { stepsAggregator } from "./steps/stepsAggregator";
import { parseTilesFactory } from "./steps/tiles/parseTilesFactory";
import { parseTownManagerRecords } from "./steps/townManager/parseTownManagerRecords";

const defaultConfigFactory = <TInterestingTypes extends number>(): ParseConfig<TInterestingTypes> => {
	return {
		interestingTileTypeEvaluator: () => undefined,
		onSectionParsed() {},
	};
};

/**
 * Take a World Data Source and read a World from it.
 *
 * If no error is thrown, guarantees that the World returned will fulfill AT LEAST the WorldBase contract, and as much of the WorldCurrent contract as is present in the data, depending on the World version.
 *
 * @template TInterestingTypes: describes the 'interesting types' of tile that will be flagged & counted if an 'interestingTileTypeEvaluator' is in the config object.
 *
 * @param {WorldDataSource} worldDataSource					The Data Source object.
 * @param {Partial<ParseConfig<TInterestingTypes>>} config	Optional configuration of the parser.
 *
 * @returns {WorldBase<TInterestingTypes> & Partial<WorldCurrent<TInterestingTypes>>}
 */
export const parseWorld = <TInterestingTypes extends number>(worldDataSource: WorldDataSource, config?: Partial<ParseConfig<TInterestingTypes>>): WorldBase<TInterestingTypes> & Partial<WorldCurrent<TInterestingTypes>> => {
	const { interestingTileTypeEvaluator, onSectionParsed }: ParseConfig<TInterestingTypes> = { ...defaultConfigFactory(), ...config };

	// Header
	const parser = stepsAggregator(parseHeaderVersion)
		.add(parseHeaderExtras)
		.add(parseHeaderSectionPointers)
		.add(parseHeaderTileFrameImportance)

		// Flags & Metadata
		.add(parseFlagsMeta)
		.add(validateVersion(95, 279))
		.add(parseFlagsWorldModes)
		.add(parseFlagsAttributes)
		.add(parseFlagsBeatenBosses)
		.add(parseFlagsSavedNPCs)
		.add(parseFlagsEvents)
		.add(parseFlagsSlimeRainAndSundial)
		.add(parseFlagsEnvironment)
		.add(parseFlagsAnglers)
		.add(parseFlagsSavedAngler)
		.add(parseFlagsAnglerQuest)
		.add(parseFlagsSavedStylist)
		.add(parseFlagsV140Events)
		.add(parseFlagsParty)
		.add(parseFlagsSandstorm)
		.add(parseFlagsV178Events)
		.add(parseFlagsStyles)
		.add(parseFlagsExtras)
		.add(validateOffset(ParserPointer.Flags, onSectionParsed))

		// Tiles
		.add(parseTilesFactory(interestingTileTypeEvaluator))
		.add(validateOffset(ParserPointer.Tiles, onSectionParsed))

		// Chests
		.add(parseChests)
		.add(validateOffset(ParserPointer.Chests, onSectionParsed))

		// Signs
		.add(parseSigns)
		.add(validateOffset(ParserPointer.Signs, onSectionParsed))

		// NPCs
		.add(parseNPCs)
		.add(parseHomelessNPCs)
		.add(validateOffset(ParserPointer.NPCs, onSectionParsed))

		// Entities
		.add(parseEntities)
		.add(validateOffset(ParserPointer.Entities, onSectionParsed))

		// Pressure Plates
		.add(parsePressurePlates)
		.add(conditionallyValidateOffset(170, ParserPointer.PressurePlates, onSectionParsed))

		// Town Manager
		.add(parseTownManagerRecords)
		.add(conditionallyValidateOffset(198, ParserPointer.TownManager, onSectionParsed))

		// Bestiary
		.add(parseBestiaryKills)
		.add(parseBestiarySeen)
		.add(parseBestiaryChatted)
		.add(conditionallyValidateOffset(210, ParserPointer.Bestiary, onSectionParsed)).final;

	return parser(worldDataSource, {});
};
