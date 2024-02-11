import { BaseRow, Segment } from "../../../nlmout-parse/types";
import React from "react";


export interface OffenseCode {
    type: 'OffenseCode';
    code: string;
    offChg: string;
}

// will parse a set of lines that looks like so...
//"OFFENSE CODE...:  391    21:846 SEC 841-851 ATTEMPT       "
//"OFF/CHG: ASSULT WITH INTENT TO COMMIT                     ",
//"         VERIFYING ORGANIZED CRIME ACTIVITY               ",
//"                                                          ",
export function parseOffenseCode(lines: string[]): OffenseCode {
    // TOOD: proabable need to be a bit more defensive here.
    // Split the first line by the first colon, everything after is the code
    const codePart = lines[0].split(':').slice(1).join(':').trim();
    // Split the second line after the first colon, then concat that with any following lines for the offChg
    const offChgParts = [lines[1].split(':').slice(1).join(':').trim()];
    const additionalParts = lines.slice(2).map(line => line.trim()); // Trim each subsequent line
    offChgParts.push(...additionalParts);

    return {
        offChg: offChgParts.join(' ').trim(),
        code: codePart,
        type: 'OffenseCode',
    };
}

export const OffenseCodeComponent: React.FC<{ segment: OffenseCode }> = ({ segment: offenseCode }) => {
    return (
        <div>
            {/* TODO: format nicely. */}
            <p>OFFENSE CODE: {offenseCode.code}</p>
            <p>OFF/CHG: {offenseCode.offChg}</p>
        </div>
    );
};

