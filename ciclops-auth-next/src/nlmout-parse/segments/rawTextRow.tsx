import { Box, Typography } from "@mui/material";
import { BaseRow } from "../types";


export interface RawTextRow extends BaseRow {
    type: 'RawTextRow';
    centered: boolean;
    empty: boolean;
    value: string;
}

export const RawTextRowComponent: React.FC<{ segment: RawTextRow }> = ({ segment: row }) => {
    return (
        <Box
            display="flex"
            justifyContent={row.centered ? 'center' : 'flex-start'}
            p={1} // Adds padding inside the box
        >
            <Typography
                component="div"
                variant="body1"
                style={{ width: '100%', textAlign: row.centered ? 'center' : 'left' }}
            >
                {row.empty ? '\u00A0' : row.value}
            </Typography>
        </Box>
    );
};

