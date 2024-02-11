import React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';

// Your data
const lines: string[] = [
    "PROPERTY..........: MY PROPS    CUSTOMER....: LAST CALL  ",
    "STREET NAME.......: JACKSON ST  ZIP.........: 22554       ",
];

interface KeyValuePairs {
    key: string;
    value: string;
}

const DataDisplay: React.FC = () => {
    // Function to split each line into key-value pairs based on colon position
    const parseLine = (line: string): KeyValuePairs[] => {
        const parts = line.split('  ').filter(part => part.includes(':'));
        return parts.map(part => {
            let [key, value] = part.split(':').map(str => str.trim());
            key = key.replace(/\./g, ''); // Remove all dots from the key
            return { key, value };
        });
    };

    return (
        <Paper sx={{ padding: 2, fontFamily: 'monospace', whiteSpace: 'pre' }}>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="span">Label 1</Typography>
                        <Typography component="span">:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Value 1</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="span">Longer Label 2</Typography>
                        <Typography component="span">:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Value 2</Typography>
                </Grid>
            </Grid>

            <hr />

            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="span">Label 1</Typography>
                        <Typography component="span">:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Value 1</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="span">Longer Label 2</Typography>
                        <Typography component="span">:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Value 2</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="span">Label Row 2</Typography>
                        <Typography component="span">:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Super long value what is it?</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography component="span">Longer Label Row 2</Typography>
                        <Typography component="span">:</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Value 2 again</Typography>
                </Grid>
            </Grid>
            <hr />
            <Grid container>
                <Grid item xs={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <Typography component="span">Label 1 :</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Value 1</Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <Typography component="span">Longer Label 2 :</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Value 2</Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <Typography component="span">Label Row 2 :</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Super long value what is it?</Typography>
                </Grid>
                <Grid item xs={3} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <Typography component="span">Longer Label Row 2 :</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>Value 2 again</Typography>
                </Grid>
            </Grid>

            <hr />

            <Grid container>
                <Grid item xs={3}>
                    Label 1 :
                </Grid>
                <Grid item xs={3}>
                    Value 1
                </Grid>
                <Grid item xs={3}>
                    Longer Label 2 :
                </Grid>
                <Grid item xs={3}>
                    Value 2
                </Grid>
                <Grid item xs={3}>
                    Label Row 2 :
                </Grid>
                <Grid item xs={3}>
                    Super long value what is it?
                </Grid>
                <Grid item xs={3}>
                    Longer Label  Row 2 :
                </Grid>
                <Grid item xs={3}>
                    Value 2 again
                </Grid>
            </Grid>
            <hr />
            {lines.map((line, index) => (
                <Grid container key={index} spacing={2} alignItems="flex-start">
                    {parseLine(line).map((pair, idx) => (
                        <React.Fragment key={idx}>
                            <Grid item xs={5} md={3} sx={{ textAlign: 'right', paddingRight: '8px' }}>
                                <Typography component="span">
                                    {pair.key}:
                                </Typography>
                            </Grid>
                            <Grid item xs={7} md={9}>
                                <Typography component="span" sx={{ marginLeft: '8px' }}>
                                    {pair.value}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            ))}
        </Paper>
    );
};

export default DataDisplay;
