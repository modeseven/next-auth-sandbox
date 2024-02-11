import { getSubstringRanges, getSubstringsFromRanges } from "@/nlmout-parse/parseHelpers";
import { parseLabeledValue } from "@/nlmout-parse/segments/labelRow";


const columns = "                      COL1 ASS  COL2       COL3            ";
const row1 = "CATEGORY1.: FOO       VAL1      $100.00    VAL3            "
const row2 = "CAT2......: BAR       VAL2                 VAL5            "
const row3 = "CAT5ADF...: BAZ                            VALX            "
const row4 = "CAT5ADF...: BAZ                                            "

const labeledValueString = "JAIL CREDIT..: TEST";
const labeledValueString2 = "JAIL CREDIT..:";
const labeledValueString3 = "JAIL CREDIT.";

test('parses row correctly', () => {
    const substringRanges = getSubstringRanges(columns)
    console.log("SUBSRING RANGES:" + substringRanges)
    const columnValues = getSubstringsFromRanges(substringRanges, columns);
    const row1Values = getSubstringsFromRanges(substringRanges, row1);
    const row2Values = getSubstringsFromRanges(substringRanges, row2);
    const row3Values = getSubstringsFromRanges(substringRanges, row3);
    const row4Values = getSubstringsFromRanges(substringRanges, row4);

    const labeledValue = parseLabeledValue(labeledValueString);
    console.log(labeledValue)
    expect(labeledValue.label).toBe("JAIL CREDIT");
    expect(labeledValue.value).toBe("TEST");
    const labeledValue2 = parseLabeledValue(labeledValueString2);
    expect(labeledValue2.label).toBe("JAIL CREDIT");
    expect(labeledValue2.value).toBe("");
    const labeledValue3 = parseLabeledValue(labeledValueString3);
    expect(labeledValue3.label).toBe("JAIL CREDIT");
    expect(labeledValue3.value).toBe("");

    // Assert
    expect(columnValues.length).toBe(4);
    expect(columnValues[0]).toBe("");
    expect(columnValues[1]).toBe("COL1 ASS");
    expect(columnValues[2]).toBe("COL2");
    expect(columnValues[3]).toBe("COL3");
    expect(row1Values.length).toBe(4);
    expect(row2Values.length).toBe(4);
    expect(row3Values.length).toBe(4);
    expect(row4Values.length).toBe(4);

});

