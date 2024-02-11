import { pppiSegmentConfigRegistry } from "@/app/parse/nlmoutParseConfig";
import { SegmentParserFunction, createSegmentParserWithCustomRegistry } from "@/nlmout-parse/segmentParser";

let segmentParser: SegmentParserFunction;

beforeEach(() => {
    // Create a segmentParser instance with the custom registry before each test
    segmentParser = createSegmentParserWithCustomRegistry(pppiSegmentConfigRegistry);
});

describe('parseRawLinesToSegments processing', () => {

    test('should process cat table block correctly', () => {

        const sectionLines = [
            "                                                     ",
            "                  COL1 ASSES     COLX     COL3            ",
            "CATEGORY1.:       VAL1           $100.00  VAL3            ",
            "  CAT2....:       VAL2           $10.00                    ",
            "  CAT5ADF.:       VAL12                                ",
            "                                                        ",
        ];

        const result = segmentParser(sectionLines);
        expect(result.length).toBe(3);
        expect(result[1]).toEqual({
            type: 'CategoricalTable',
            columns: ["", "COL1 ASSES", "COLX", "COL3"],
            rows: [{
                category: {
                    label: "CATEGORY1",
                    value: ""
                },
                values: ["VAL1", "$100.00", "VAL3"]
            },
            {
                category: {
                    label: "CAT2",
                    value: ""
                },
                values: ["VAL2", "$10.00", ""]
            },
            {
                category: {
                    label: "CAT5ADF",
                    value: ""
                },
                values: ["VAL12", "", ""]
            }],
        });


    });

    test('should process jail credit block correctly', () => {

        const sectionLines = [
            "LEAD IN LINE........:  391    21:846 SEC 841-851 ATTEMPT       ",
            "JAIL CREDIT........:  FROM DATE     THRU DATE         ",
            "                      04-16-1996    05-16-1996       ",
            "                      06-16-1996    06-23-1996       ",
            "                      06-16-1996                     ",
            "                                    06-23-1996       ",
            "                                                     ",
        ];

        const result = segmentParser(sectionLines);
        expect(result.length).toBe(3);
        expect(result[1]).toEqual({
            type: 'LabeledTable',
            label: "",
            columns: ["JAIL CREDIT........:", "FROM DATE", "THRU DATE"],
            rows: [
                { values: ["", "04-16-1996", "05-16-1996"] },
                { values: ["", "06-16-1996", "06-23-1996"] },
                { values: ["", "06-16-1996", ""] },
                { values: ["", "", "06-23-1996"] }],
        });
        expect(result[2]).toEqual({
            "centered": true,
            "empty": true,
            "type": "RawTextRow",
            "value": "",
        });

    });

    test('should process obligation label block correctly', () => {

        const sectionLines = [
            "TERM OF SUPERVISED RELEASE......:   5 YEARS                      ",
            "RELATIONSHIP OF THIS OBLIGATION                             ",
            " TO OTHERS FOR THE OFFENDER.....:  CC                             ",
            "DATE OF OFFENSE.................:   01/01/2000         ",
            "DATE OF SUPERMAN ...............:   01/01/2000         ",
            "                                                     "];


        const result = segmentParser(sectionLines);
        expect(result.length).toBe(5);
        expect(result[0]).toEqual({
            type: 'LabelRow',
            centered: false,
            colonPos: [32],
            value: [
                {
                    label: "TERM OF SUPERVISED RELEASE......",
                    value: "5 YEARS"
                }
            ],
        });

        expect(result[1]).toEqual({
            type: 'LabelRow',
            centered: false,
            colonPos: [],
            value: [
                {
                    label: "RELATIONSHIP OF THIS OBLIGATION TO OTHERS FOR THE OFFENDER.....",
                    value: "CC"
                }
            ],
        });

        expect(result[2]).toEqual({
            type: 'LabelRow',
            centered: false,
            colonPos: [32],
            value: [
                {
                    label: "DATE OF OFFENSE.................",
                    value: "01/01/2000"
                }
            ],
        });



    });




});
