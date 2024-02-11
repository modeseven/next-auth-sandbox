import { Section } from "./types";

export function parseInputToSections(input: string[]): Section[] {
    const sections: Section[] = [];
    let currentSection: Section | null = null;
    const regex = /^-+\s*\w.*\w\s*-+$/;
    input.forEach(line => {
        // console.log("checking line", line);
        if (regex.test(line)) {
            // console.log("found a line with dashes", line);
            // This is a new section
            const label = line.replace(/-+/g, '').trim();
            if (currentSection) {
                sections.push(currentSection); // Push the previous section if it exists
            }
            // Start a new section
            currentSection = { label, rawLines: [] };
        } else if (currentSection) {
            // Add line to current section
            currentSection.rawLines.push(line);
        }
    });

    if (currentSection) {
        sections.push(currentSection); // Push the last section
    }

    return sections;
}
