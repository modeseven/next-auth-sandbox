import { BaseRow } from "../types";
import { getSubstringRanges, getSubstringsFromRanges } from "../parseHelpers";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { LabeledValue, LabeledValueComponent, parseLabeledValue } from "./labelRow";

export interface CategoryRow {
    category: LabeledValue;
    values: string[];
}

export interface CategoricalTable extends BaseRow {
    type: 'CategoricalTable';
    columns: string[];
    rows: CategoryRow[];
}


export function parseCategoryTable(lines: string[]): CategoricalTable {
    const table: CategoricalTable = {
        columns: [],
        rows: [],
        type: 'CategoricalTable',
    };

    // set up cols frist
    // get ranges from header (first line)
    const colRanges = getSubstringRanges(lines[0]);
    table.columns = getSubstringsFromRanges(colRanges, lines[0]);

    // Now, process each subsequent line for categories and values.
    lines.slice(1).forEach(line => {
        const rowVals = getSubstringsFromRanges(colRanges, line);
        const categoryPart = rowVals[0]; // first col is the category

        if (categoryPart) {
            const category: LabeledValue = parseLabeledValue(categoryPart);
            const values = rowVals.slice(1);
            table.rows.push({
                category,
                values,
            });
        }
    });

    return table;
}


export const CategoricalTableComponent: React.FC<{ segment: CategoricalTable }> = ({ segment: table }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="categorical table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" style={{ fontWeight: 'bold' }}></TableCell>
                        {table.columns.map((column, index) => (
                            // Skipping the first column since it's always empty
                            index > 0 && <TableCell key={column} align="center" style={{ fontWeight: 'bold' }}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {/* First column for category label/value */}
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                <LabeledValueComponent data={row.category} />
                            </TableCell>
                            {/* Render the values for the category */}
                            {row.values.map((value, valueIndex) => (
                                <TableCell key={valueIndex} align="center">{value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
