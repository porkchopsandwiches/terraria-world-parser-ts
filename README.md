# Terraria World Parser

For reading Terraria World files.

## Installation

`npm install @porkchopsandwich/terraria-world-parser`

You'll need a binary reader too (more below), for example, ByteBuffer.

`npm install bytebuffer`

## Usage

```typescript
import { parseWorld, worldIsVersion } from "@porkchopandwich/terraria-world-parser"

// ByteBuffer/FileBuffer is not the only way to do this, you can also use your own binary file reader if you prefer (see below)
import * as ByteBuffer from "bytebuffer";
import fs from "node.fs";
const fileBuffer = await fs.promises.readFile(`path/to/terraria/world.wld`);
const worldDataSource = ByteBuffer.wrap(fileBuffer, "ut8", ByteBuffer.LITTLE_ENDIAN);

// Parse the world to a WorldBase object
const parsedWorld = parseWorld(worldDataSource, {
	onSectionParsed: (pointer) => console.log("Completed parsing of section", pointer),
	interestingTileTypeEvaluator: (tileData) => {
		// Evaluate the tile and return a number to use for grouping, or undefined if you don't care about it
	}
});

if (worldIsVersion(parsedWorld, 217)) {
	// World is at least v217, can access fields added in that version
	console.log("Bought dog?", parsedWorld.boughtDog);
}

```
## API

```typescript
parseWorld(worldDataSource: WorldDataSource, options?: Partial<ParserOptions>): WorldBase & Partial<WorldCurrent>
```

`parseWorld` takes a `WorldDataSource` (more below) and an optional configuration object, and returns an object that is guaranteed (assuming no errors) to have at least all the properties of `WorldBase`, and as many of the properties of `WorldCurrent` as are present in the world being parsed, depending on version.

```typescript
worldIsVersion(world: WorldBase, version: number): boolean
```
`worldIsVersion` takes a `WorldBase` instance and a version, and returns true if the world is at least that version. If you are using TypeScript, it will also apply type safety, ensuring that the passed `World` is an instance of the appropriate World type.

## Contracts

### `WorldBase`
Describes the minimum amount of information the parser will return, based on Terraria's world version 95.


| Field                   | Type                  | Notes                                                                                                                                                                                                                                                                                                       |
|-------------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `version`               | `number`              | The world file version                                                                                                                                                                                                                                                                                      |
| `title`                 | `string`              | The name of the world                                                                                                                                                                                                                                                                                       |
| `id`                    | `number`              | The world ID                                                                                                                                                                                                                                                                                                |
| `width`                 | `number`              | The width of the world, in blocks                                                                                                                                                                                                                                                                           |
| `height`                | `number`              | The height of the world, in blocks                                                                                                                                                                                                                                                                          |
| `tiles`                 | `TileData[][]`        | The tiles, arranged in columns                                                                                                                                                                                                                                                                              |
| `signs`                 | `Sign[]`              | Signs in the world                                                                                                                                                                                                                                                                                          |
| `npcs`                  | `NPC[]`               | NPCs in the world                                                                                                                                                                                                                                                                                           |
| `chests`                | `Chest[]`             | Chests in the world                                                                                                                                                                                                                                                                                         |
| `interestingTileCounts` | `Map<number, number>` | When using the `interestingTileTypeEvaluator` in the parser options, returning a number will cause the corresponding key in this map to be incremented by 1. This allows a quick count of all the tiles that returned that 'interesting type' to be obtained -- useful for counting the amount of ore, etc. |

Various additional fields to be documented.

### `TileData`
Describes a tile in the world.

| Field                 | Type               | Notes                                                                          |
|-----------------------|--------------------|--------------------------------------------------------------------------------|
| `activeFlags`         | `number`           | Bitwise `TileActiveFlags` (more below)                                         |
| `tileFlags`           | `number`, optional | Bitwise `TileFlags (more below). Only present if `TileActiveFlags` Bit 0 is on |
| `u`                   | `number`, optional | Used to look up the sub type of tile, if necessary                             |
| `v`                   | `number`, optional | Used to look up the sub type of tile, if necessary                             |
| `color`               | `number`, optional | Paint color, if present                                                        |
| `wallColor`           | `number`, optional | Paint color of wall, if present                                                |
| `liquidType`          | `number`, optional | Liquid type present in tile, if any                                            |
| `liquidAmount`        | `number`, optional | Liquid amount present in tile, if any                                          |
| `rle`                 | `number`, optional | Number of times tile was repeated vertically down when saved in the world      |
| `tileTypeId`          | `number`, optional | ID of tile present, if any                                                     |
| `wallTypeId`          | `number`, optional | ID of wall present, if any                                                     |
| `interestingTileType` | `number`, optional | Number returned from `interestingTileTypeEvaluator` for this tile, if any      |

### `WorldDataSource`
Describes an object that can be used to read World data. This contract is derived from a subset of the `ByteBuffer` interface from the library of the same name, and a `ByteBuffer` instance may be passed as the World Data Source; however any other binary reading library could be used with the addition of a trivial wrapper.

| Field            | Type                         | Notes                                    |
|------------------|------------------------------|------------------------------------------|
| `offset`         | `number`                     | The current bit offset                   |
| `readUint8`      | `() => number`               | Read an unsigned 8-bit int               |
| `readUint16`     | `() => number`               | Read an unsigned 16-bit int              |
| `readUint32`     | `() => number`               | Read an unsigned 32-bit int              |
| `readInt8`       | `() => number`               | Read a signed 8-bit int                  |
| `readInt16`      | `() => number`               | Read a signed 16-bit int                 |
| `readInt32`      | `() => number`               | Read a signed 32-bit int                 |
| `readFloat32`    | `() => number`               | Read a 32-bit float                      |
| `readFloat64`    | `() => number`               | Read a 64-bit float                      |
| `readUTF8String` | `(length: number) => string` | Read a UTF-8 string of the passed length |
