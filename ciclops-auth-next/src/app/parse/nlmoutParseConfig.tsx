import { parseObligation } from "./segments/obligationLabel";
import { CategoricalTableComponent, parseCategoryTable } from "../../nlmout-parse/segments/categoryTable";
import { LabelRowComponent } from "../../nlmout-parse/segments/labelRow";
import { LabeledTableComponent, parseLabeledTable } from "../../nlmout-parse/segments/labeledTable";
import { OffenseCode, OffenseCodeComponent, parseOffenseCode } from "./segments/offenseCode";
import { RawTextRowComponent } from "../../nlmout-parse/segments/rawTextRow";
import { SegmentConfig, createCaptureTillEmptyLineConfig } from "../../nlmout-parse/types";
import { Segment as CommonSegment } from "../../nlmout-parse/types";

export type ExtendedSegment = CommonSegment | OffenseCode;
/**
 * Registry of custom SegmentConfig objects, each defining how to identify and process
 * different types of segments within a document. This registry is used to dynamically
 * match lines of text to their corresponding segment types and process them accordingly.
 *
 * Each configuration includes:
 * - type: A string that uniquely identifies the type of segment.
 * - captureStartFunc: A predicate function that returns true if a given line should start the capture of this segment type.
 * - captureUntilFunc: A predicate function that returns true if a given line should end the capture of this segment type.
 * - processor: A function that takes the captured lines for this segment and processes them into a Segment object.
 */
export const pppiSegmentConfigRegistry: SegmentConfig[] = [
    {
        type: "OffenseCode",
        capture: createCaptureTillEmptyLineConfig("OFFENSE CODE"),
        processor: parseOffenseCode,
    },
    {
        type: "JailCredit",
        capture: createCaptureTillEmptyLineConfig("JAIL CREDIT."),
        processor: parseLabeledTable,
    },
    {
        type: "ColAsses",
        capture: createCaptureTillEmptyLineConfig("COL1 ASSES     COLX     COL3"),
        processor: parseCategoryTable,
    },
    {
        type: "ObligationLabelVal",
        capture: {
            captureStartFunc: (line: string) => line.trim().startsWith("RELATIONSHIP OF THIS OBLIGATION"),
            // captureUntilFunc: (line: string) => line.startsWith(" TO OTHERS"),
            includeLastCapturedLineInSegment: true,
            linesToCapture: 2,
        },
        processor: parseObligation,
    },
];

// add new components here
export const componentRegistry: { [key: string]: React.ComponentType<any> } = {
    LabelRow: LabelRowComponent,
    RawTextRow: RawTextRowComponent,
    CategoricalTable: CategoricalTableComponent,
    LabeledTable: LabeledTableComponent,
    OffenseCode: OffenseCodeComponent,
};
