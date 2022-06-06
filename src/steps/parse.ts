import { ParserPointer } from "../enums/ParserPointer";
import { parseBestiaryChatted } from "./bestiary/parseBestiaryChatted";
import { parseBestiaryKills } from "./bestiary/parseBestiaryKills";
import { parseBestiarySeen } from "./bestiary/parseBestiarySeen";
import { parseChests } from "./chests/parseChests";
import { conditionallyValidateOffset } from "./common/conditionallyValidateOffset";
import { validateOffset } from "./common/validateOffset";
import { validateVersion } from "./common/validateVersion";
import { parseEntities } from "./entities/parseEntities";
import { parseFlagsAnglerQuest } from "./flags/parseFlagsAnglerQuest";
import { parseFlagsAnglers } from "./flags/parseFlagsAnglers";
import { parseFlagsAttributes } from "./flags/parseFlagsAttributes";
import { parseFlagsBeatenBosses } from "./flags/parseFlagsBeatenBosses";
import { parseFlagsEnvironment } from "./flags/parseFlagsEnvironment";
import { parseFlagsEvents } from "./flags/parseFlagsEvents";
import { parseFlagsExtras } from "./flags/parseFlagsExtras";
import { parseFlagsMeta } from "./flags/parseFlagsMeta";
import { parseFlagsParty } from "./flags/parseFlagsParty";
import { parseFlagsSandstorm } from "./flags/parseFlagsSandstorm";
import { parseFlagsSavedAngler } from "./flags/parseFlagsSavedAngler";
import { parseFlagsSavedNPCs } from "./flags/parseFlagsSavedNPCs";
import { parseFlagsSavedStylist } from "./flags/parseFlagsSavedStylist";
import { parseFlagsSlimeRainAndSundial } from "./flags/parseFlagsSlimeRainAndSundial";
import { parseFlagsStyles } from "./flags/parseFlagsStyles";
import { parseFlagsV140Events } from "./flags/parseFlagsV140Events";
import { parseFlagsV178Events } from "./flags/parseFlagsV178Events";
import { parseFlagsWorldModes } from "./flags/parseFlagsWorldModes";
import { parseHeaderExtras } from "./header/parseHeaderExtras";
import { parseHeaderSectionPointers } from "./header/parseHeaderSectionPointers";
import { parseHeaderTileFrameImportance } from "./header/parseHeaderTileFrameImportance";
import { parseHeaderVersion } from "./header/parseHeaderVersion";
import { parseHomelessNPCs } from "./npcs/parseHomelessNPCs";
import { parseNPCs } from "./npcs/parseNPCs";
import { parsePressurePlates } from "./pressurePlates/parsePressurePlates";
import { parseSigns } from "./signs/parseSigns";
import { stepsAggregator } from "./stepsAggregator";
import { parseTiles } from "./tiles/parseTiles";
import { parseTownManagerRecords } from "./townManager/parseTownManagerRecords";

export const parse =

	// Header
	stepsAggregator(parseHeaderVersion)
	.add(parseHeaderExtras)
	.add(parseHeaderSectionPointers)
	.add(parseHeaderTileFrameImportance)

	// Flags
	.add(parseFlagsMeta)
	.add(validateVersion(95, 248))
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
	.add(validateOffset(ParserPointer.Flags))

	// Tiles
	.add(parseTiles)
	.add(validateOffset(ParserPointer.Tiles))

	// Chests
	.add(parseChests)
	.add(validateOffset(ParserPointer.Chests))

	// Signs
	.add(parseSigns)
	.add(validateOffset(ParserPointer.Signs))

	// NPCs
	.add(parseNPCs)
	.add(parseHomelessNPCs)
	.add(validateOffset(ParserPointer.NPCs))

	// Entities
	.add(parseEntities)
	.add(validateOffset(ParserPointer.Entities))

	// Pressure Plates
	.add(parsePressurePlates)
	.add(conditionallyValidateOffset(170, ParserPointer.PressurePlates))

	// Town Manager
	.add(parseTownManagerRecords)
	.add(conditionallyValidateOffset(198, ParserPointer.TownManager))

	// Bestiary
	.add(parseBestiaryKills)
	.add(parseBestiarySeen)
	.add(parseBestiaryChatted)
	.add(conditionallyValidateOffset(210, ParserPointer.Bestiary))
	.final;
