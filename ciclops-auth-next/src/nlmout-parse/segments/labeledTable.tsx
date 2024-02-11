import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { BaseRow } from '../types';
import { getSubstringRanges, getSubstringsFromRanges } from "../parseHelpers";

export interface TableRow {
    values: string[];
}

export interface LabeledTable extends BaseRow {
    type: 'LabeledTable';
    label: string;
    columns: string[];
    rows: TableRow[];
}

export function parseLabeledTable(lines: string[]): LabeledTable {
    if (lines.length === 0) {
        return { type: "LabeledTable", label: "", columns: [], rows: [] };
    }

    const colRanges = getSubstringRanges(lines[0]);
    const cols = getSubstringsFromRanges(colRanges, lines[0]);
    const columns = cols.slice(1);
    const label = cols[0]?.replace(/\./g, "")?.trim();
    const rows: TableRow[] = [];

    lines.slice(1).forEach(line => {
        const rowValues = getSubstringsFromRanges(colRanges, line);
        const tableRow: TableRow = { values: rowValues.slice(1) };
        rows.push(tableRow);
    });

    return {
        type: "LabeledTable",
        label,
        columns,
        rows
    };
}


interface LabeledTableComponentProps {
    segment: LabeledTable;
}

export const LabeledTableComponent: React.FC<LabeledTableComponentProps> = ({ segment: table }) => {
    const formattedLabel = table.label.replace(/\./g, ' ');
    return (
        <div>
            <Typography variant="h6" style={{ margin: '20px 0' }}>{formattedLabel}</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {table.columns.map((column, index) => (
                                <TableCell key={index}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.values.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};
