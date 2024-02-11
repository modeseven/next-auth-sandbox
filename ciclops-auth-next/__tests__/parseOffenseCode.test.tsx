import { pppiSegmentConfigRegistry } from "@/app/parse/nlmoutParseConfig";
import { SegmentParserFunction, createSegmentParserWithCustomRegistry } from "@/nlmout-parse/segmentParser";

let segmentParser: SegmentParserFunction;

beforeEach(() => {
    // Create a segmentParser instance with the custom registry before each test
    segmentParser = createSegmentParserWithCustomRegistry(pppiSegmentConfigRegistry);
});


describe('parseRawLinesToRows with Offense Code processing', () => {

    test('should process BASIC offense code blocks correctly', () => {
        const rawLines = [
            "OFFENSE CODE...:  391    21:846 SEC 841-851 ATTEMPT",
            "OFF/CHG: COMPSPIRCAY TO POSSES AND DISTUBUTE & POSSESS W/INTENT TO DISTRIBUTE",
            "         TO DISTUBUTE COCAI, 21 USC 846, 812 & 841-851",
            "                                                          "
        ];


        const result = segmentParser(rawLines);

        expect(result).toEqual([{
            type: 'OffenseCode',
            code: '391    21:846 SEC 841-851 ATTEMPT',
            offChg: 'COMPSPIRCAY TO POSSES AND DISTUBUTE & POSSESS W/INTENT TO DISTRIBUTE TO DISTUBUTE COCAI, 21 USC 846, 812 & 841-851',
        },
        {
            "centered": true,
            "empty": true,
            "type": "RawTextRow",
            "value": "",
        }]);
    });

    test('should process long offense code blocks correctly', () => {
        const rawLines = [
            "OFFENSE CODE...:  391    21:846 SEC 841-851 ATTEMPT",
            "OFF/CHG: COMPSPIRCAY TO POSSES AND DISTUBUTE & POSSESS W/INTENT TO DISTRIBUTE",
            "        TBD LOOKING FOR EVIDENCE OF A CRIME",
            "        TBD LOOKING FOR EVIDENCE OF A CRIME",
            "        TBD LOOKING FOR EVIDENCE OF A CRIME",
            "                                                          "
        ];


        const result = segmentParser(rawLines);

        expect(result).toEqual([{
            type: 'OffenseCode',
            code: '391    21:846 SEC 841-851 ATTEMPT',
            offChg: 'COMPSPIRCAY TO POSSES AND DISTUBUTE & POSSESS W/INTENT TO DISTRIBUTE TBD LOOKING FOR EVIDENCE OF A CRIME TBD LOOKING FOR EVIDENCE OF A CRIME TBD LOOKING FOR EVIDENCE OF A CRIME',
        },
        {
            "centered": true,
            "empty": true,
            "type": "RawTextRow",
            "value": "",
        }]);
    });


});
