
export function isLineCentered(line: string): boolean {
    return line.startsWith(" ") && line.endsWith(" ");
}

export function getSubstringsFromRanges(ranges: [number, number][], subject: string): string[] {
    return ranges.map(([start, end]) => subject.substring(start, end + 1).trim());
}

export function getSubstringRanges(input: string): [number, number][] {
    const ranges: [number, number][] = [];
    const cleanedInput = input.replace(/(\b\w+\b)\s(\b\w+\b)/g, '$1|$2');
    const columns = cleanedInput.trim().split(/\s+/);

    // Find the start index for the first column, which is the first non-whitespace character
    let startIndex = cleanedInput.indexOf(columns[0]);
    ranges.push([0, startIndex - 1]);

    // Find the start and end index for each subsequent column
    for (let i = 0; i < columns.length - 1; i++) {
        let endIndex = cleanedInput.indexOf(columns[i + 1], startIndex) - 2;
        ranges.push([startIndex, endIndex]);
        startIndex = endIndex + 1;
    }

    // Add the range for the last column up to the end of the string
    ranges.push([startIndex, cleanedInput.length]);

    return ranges;
}

function groupLines(inputLines: string[]): { lines: string[] }[] {
    // Array to hold the grouped objects
    const groupedLines: { lines: string[] }[] = [];

    // Temporary array to hold lines for the current group
    let currentGroup: string[] = [];

    inputLines.forEach((line) => {
        // Check if the line starts with a date (pattern: "MM-DD-YYYY")
        if (/^\d{2}-\d{2}-\d{4}/.test(line)) {
            // If there's an existing group, push it to the groupedLines array
            if (currentGroup.length > 0) {
                groupedLines.push({ lines: currentGroup });
                currentGroup = []; // Reset the current group
            }
            // Add the new line to the current group
            currentGroup.push(line);
        } else if (line.trim() !== "") { // Check if the line is not just empty/spaces
            // Add indented/continuation lines to the current group
            currentGroup.push(line);
        }
    });

    // After the loop, add the last group if it's not empty
    if (currentGroup.length > 0) {
        groupedLines.push({ lines: currentGroup });
    }

    return groupedLines;
}

