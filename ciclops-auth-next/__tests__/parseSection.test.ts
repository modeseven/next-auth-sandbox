import { parseInputToSections } from "@/nlmout-parse/sectionParser";


test('should parse input into sections correctly', () => {
    const input: string[] = [
        "---- Apple -----",
        "-- -- -- -- -- --",
        "1. Red Delicious",
        "2. Granny Smith",
        "----Banana------",
        "3. Cavendish",
        "-- -- -- -- --",
        "---- Orange -------",
        "4. Mandarin",
        "---- Orange 2 -------",
        "---- Orange 3 -------",
        "---- Orange 4 -------",
        "        ",
        "-      -",
    ];

    const out = parseInputToSections(input);
    expect(out.length).toBe(6);

    expect(out).toEqual([
        { label: "Apple", rawLines: ["-- -- -- -- -- --", "1. Red Delicious", "2. Granny Smith"] },
        { label: "Banana", rawLines: ["3. Cavendish", "-- -- -- -- --"] },
        { label: "Orange", rawLines: ["4. Mandarin"] },
        { label: "Orange 2", rawLines: [] },
        { label: "Orange 3", rawLines: [] },
        { label: "Orange 4", rawLines: ["        ", "-      -"] },
    ]);
});
