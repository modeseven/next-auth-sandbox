import { LabelRow } from "../../../nlmout-parse/segments/labelRow";


// will parse a set of lines that looks like so...
//"RELATIONSHIP OF THIS OBLIGATION                             ",
//" TO OTHERS FOR THE OFFENDER.....:  CC                             ",
//"DATE OF OFFENSE.................:   01/01/2000         ",
export function parseObligation(lines: string[]): LabelRow {
    // Check if the array has at least two lines
    console.log(lines);
    if (lines.length < 2) {
        throw new Error("Input array must contain at least two lines.");
    }

    // Extract the first line
    const firstLine = lines[0].trim();

    // Extract and process the second line to split by the colon
    const secondLineParts = lines[1].split(":");
    if (secondLineParts.length < 2) {
        throw new Error("Second line does not contain a colon-separated value.");
    }
    const preColonPart = secondLineParts[0].trim();
    const postColonValue = secondLineParts[1].trim();

    // Construct the label by concatenating the first line and the first part of the second line
    const label = `${firstLine} ${preColonPart}`;

    // The value is the part after the colon, trimmed
    const value = postColonValue;

    return {
        centered: false,
        value: [{ label, value }],
        colonPos: [],
        type: 'LabelRow',
    };
}


