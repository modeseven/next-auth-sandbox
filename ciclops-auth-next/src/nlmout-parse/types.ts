import { CategoricalTable } from "./segments/categoryTable";
import { LabelRow } from "./segments/labelRow";
import { LabeledTable } from "./segments/labeledTable";
import { RawTextRow } from "./segments/rawTextRow";

export interface Section {
    label: string;
    rawLines: string[];
}

export type Segment = LabelRow | RawTextRow | CategoricalTable | LabeledTable

export interface BaseRow {
    type: 'LabelRow' | 'RawTextRow' | 'CategoricalTable' | 'LabeledTable'
}

export type Processor = (lines: string[]) => any;

/**
 * Configuration for capturing a segment from a set of lines.
 * Note that if linesToCapture is defined, the captureUntilFunc will be ignored.
 */
export type CaptureConfig = {
    captureStartFunc: (line: string) => boolean;
    captureUntilFunc?: (line: string, nextLine?: string | null) => boolean;
    includeLastCapturedLineInSegment: boolean;
    linesToCapture?: number;
};

export interface SegmentConfig {
    type: string;
    capture: CaptureConfig;
    processor: Processor;
}

/**
 * basic capture config for a segment that starts with a string and ends with an empty line
 * @param startsWithString 
 * @returns 
 */
export function createCaptureTillEmptyLineConfig(startsWithString: string): CaptureConfig {
    return {
        captureStartFunc: (line: string) => line.trim().startsWith(startsWithString),
        captureUntilFunc: (line: string) => line.trim().length === 0,
        includeLastCapturedLineInSegment: false
    };
}





