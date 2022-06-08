export type WorldDataSource = {
	offset: number;
	readUint8: () => number;
	readUint16: () => number;
	readUint32: () => number;
	readInt16: () => number;
	readInt32: () => number;
	readFloat32: () => number;
	readFloat64: () => number;
	readInt8: () => number;
	readUTF8String: (length: number) => string;
};
