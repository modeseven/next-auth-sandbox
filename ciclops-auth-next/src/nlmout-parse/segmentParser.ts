import { isLineCentered } from "./parseHelpers";
import { parseLabelRow } from "./segments/labelRow";
import { Segment, SegmentConfig } from "./types";
import { RawTextRow } from "./segments/rawTextRow";

export type SegmentParserFunction = (rawLines: string[]) => Segment[];
export function createSegmentParserWithCustomRegistry(customSegmentConfigRegistry: SegmentConfig[]): SegmentParserFunction {

    function processRegularLine(line: string, rows: Segment[]): void {
        if (line.includes(": ")) {
            rows.push(parseLabelRow(line));
        } else {
            const trimmedLine = line.trim();
            rows.push({
                type: 'RawTextRow',
                centered: isLineCentered(line),
                empty: trimmedLine.length === 0,
                value: trimmedLine
            } as RawTextRow);
        }
    }

    function checkForStartCapture(line: string): SegmentConfig | undefined {
        return customSegmentConfigRegistry.find(config => config.capture.captureStartFunc(line));
    }

    return function segmentParser(rawLines: string[]): Segment[] {
        const rows: Segment[] = [];
        let collecting = false;
        let collectedLines: string[] = [];
        let currentProcessingSegment: SegmentConfig | null = null;
        let linesRemainingToCapture = 0; // Add a counter for lines left to capture

        for (let i = 0; i < rawLines.length; i++) {
            let line = rawLines[i];

            if (collecting) {
                if (currentProcessingSegment && linesRemainingToCapture > 0) {
                    // If we are in fixed line capture mode
                    collectedLines.push(line);
                    linesRemainingToCapture--;

                    if (linesRemainingToCapture === 0) {
                        // If we've captured the required number of lines
                        const processedSegment: Segment = currentProcessingSegment.processor(collectedLines);
                        rows.push(processedSegment);
                        collecting = false;
                        collectedLines = [];
                        currentProcessingSegment = null;
                    }
                } else if (currentProcessingSegment && currentProcessingSegment.capture.captureUntilFunc && currentProcessingSegment.capture.captureUntilFunc(line, rawLines[i + 1])) {
                    if (currentProcessingSegment.capture.includeLastCapturedLineInSegment) {
                        collectedLines.push(line);
                    } else {
                        i--; // Adjust i if not including the last captured line
                    }

                    const processedSegment: Segment = currentProcessingSegment.processor(collectedLines);
                    rows.push(processedSegment);
                    collecting = false;
                    collectedLines = [];
                    currentProcessingSegment = null;
                } else if (!currentProcessingSegment?.capture.linesToCapture) {
                    // Continue collecting lines for the current segment if not in fixed line capture mode
                    collectedLines.push(line);
                }
            } else {
                const match = checkForStartCapture(line);
                if (match) {
                    collecting = true;
                    collectedLines = [line];
                    currentProcessingSegment = match;

                    if (match.capture.linesToCapture) {
                        // If fixed number of lines to capture is defined, set the counter
                        linesRemainingToCapture = match.capture.linesToCapture - 1; // Subtract 1 because the current line is already captured
                    }
                } else {
                    // Process as a regular line if it does not start a new segment
                    processRegularLine(line, rows);
                }
            }
        }
        return rows;
    }



}











