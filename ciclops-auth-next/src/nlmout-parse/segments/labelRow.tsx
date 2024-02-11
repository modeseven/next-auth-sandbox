import { Box, Typography, Grid } from "@mui/material";
import { isLineCentered } from "../parseHelpers";
import { BaseRow } from "../types";

export interface LabelRow extends BaseRow {
    type: 'LabelRow';
    centered: boolean;
    value: LabeledValue[];
    colonPos: number[];
}

export interface LabeledValue {
    label: string;
    value: string;
}

function findColonIndices(input: string): number[] {
    const indices: number[] = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === ':') {
            indices.push(i);
        }
    }
    return indices;
}

export function parseLabeledValue(input: string): LabeledValue {
    const [label, value] = input.split(":"); // this only gets the first colon key/vals
    const lv: LabeledValue = {
        label: label?.replace(/\./g, "")?.trim() ?? "",
        value: value?.trim() ?? ""
    };
    return lv;
}

function preprocessLine(line: string): string {
    // Replace ":" with a placeholder (e.g., "%%") when it's between non-whitespace characters
    const preprocessedLine = line.replace(/(\S):(\S)/g, '$1%%$2');
    return preprocessedLine;
}

export function parseLabelRow(line: string): LabelRow {
    // Preprocess the line to replace non-separating colons with a placeholder
    const preprocessedLine = preprocessLine(line);

    // Clean whitespace to the right of each ":"
    const cleanedString = preprocessedLine.replace(/:\s+/g, ": ").trim();

    // Determine if there's more than one ":" in the line
    const colonCount = (cleanedString.match(/:/g) || []).length;

    let cleanedLine = cleanedString;
    if (colonCount > 1) {
        // Replace any whitespace gaps greater than 1 between each label/value pair with a "|"
        cleanedLine = cleanedString.replace(/\s{2,}/g, '|');
    }

    // console.log("cleaned line", cleanedLine);

    // Split on the "|" character, ensuring we process non-empty parts, or split directly if no "|" added
    const parts = colonCount > 1 ? cleanedLine.split('|').filter(part => part.trim() !== '') : [cleanedLine];

    // Extract label and values from the split array, handling empty values correctly
    const labelValues: LabeledValue[] = parts.map(part => {
        part = part.replace(/%%/g, ":");
        // NEED FIRST INSTANE.
        const index = part.indexOf(':');
        const label = part.substring(0, index).trim();
        const value = part.substring(index + 1).trim();
        return { label, value };
    });


    const centered = isLineCentered(line);

    return {
        type: 'LabelRow',
        centered,
        value: labelValues,
        colonPos: findColonIndices(line),
    };
}

interface LabeledValueComponentProps {
    data: LabeledValue;
}


export const LabeledValueComponent: React.FC<LabeledValueComponentProps> = ({ data }) => {

    const formattedLabel = data.label.replace(/\./g, ' ');
    return (
        <Box display="flex" justifyContent="flex-start" alignItems="center" padding={2}>
            <Typography variant="subtitle1" component="span">
                {`${formattedLabel}: `}
            </Typography>
            <Typography variant="body1" component="span">
                {data.value}
            </Typography>
        </Box>
    );
};


export const LabelRowComponent: React.FC<{ segment: LabelRow }> = ({ segment: row }) => {
    const gridSpacing = 5; // Adjust the spacing as needed

    return (
        <Box sx={{ width: '100%', textAlign: row.centered ? 'center' : 'inherit' }}>
            {row.value.length > 1 ? (
                <Grid container spacing={gridSpacing}>
                    {row.value.map((item, index) => (
                        <Grid item xs={12 / row.value.length} key={index}>
                            <LabeledValueComponent data={item} />
                        </Grid>
                    ))}
                </Grid>
            ) : row.value.length === 1 ? (
                <>
                    <LabeledValueComponent data={row.value[0]} />
                </>
            ) : (
                <Typography variant="body1">No data</Typography>
            )}
            {/* {JSON.stringify(row.semcolinPos)} */}
        </Box>
    );
};


