import { LabelRow, parseLabelRow } from "@/nlmout-parse/segments/labelRow";


test('parses single labelRow correctly', () => {
    const row1 = "ANOTHER LABLE.............: ANOTHER VALUE               ";
    const lr: LabelRow = parseLabelRow(row1);
    expect(lr.value.length).toBe(1)
    expect(lr.value[0].label).toBe("ANOTHER LABLE.............");
    expect(lr.value[0].value).toBe("ANOTHER VALUE");
    expect(lr.centered).toBe(false);
});

test('parses double labelRow correctly', () => {
    const row2 = "PROPERTY..........: MY PROPS    CUSTOMER....: LAST CALL  ";
    const lr: LabelRow = parseLabelRow(row2);
    expect(lr.value.length).toBe(2)
    expect(lr.value[0].label).toBe("PROPERTY..........");
    expect(lr.value[0].value).toBe("MY PROPS");
    expect(lr.value[1].label).toBe("CUSTOMER....");
    expect(lr.value[1].value).toBe("LAST CALL");
    expect(lr.centered).toBe(false);
});

test('parses double centered labelRow correctly', () => {
    const row3 = "                 PHONE: N/A   FAX: N/A                      ";
    const lr: LabelRow = parseLabelRow(row3);
    expect(lr.value.length).toBe(2)
    expect(lr.value[0].label).toBe("PHONE");
    expect(lr.value[0].value).toBe("N/A");
    expect(lr.value[1].label).toBe("FAX");
    expect(lr.value[1].value).toBe("N/A");
    expect(lr.centered).toBe(true);
});

test('parses single labelRow with semicolon in value correctly', () => {
    const row3 = "OFFENSE CODE...:  391    21:846 SEC 841-851 ATTEMPT       ";
    const lr: LabelRow = parseLabelRow(row3);
    expect(lr.value.length).toBe(1)
    expect(lr.value[0].label).toBe("OFFENSE CODE...");
    expect(lr.value[0].value).toBe("391    21:846 SEC 841-851 ATTEMPT");
    expect(lr.centered).toBe(false);
});

