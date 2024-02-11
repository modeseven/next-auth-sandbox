import { createSegmentParserWithCustomRegistry } from "../../nlmout-parse/segmentParser";
import { Section } from "../../nlmout-parse/types";
import { out } from "./nlmout";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import DataDisplay from "./research";
import { ExtendedSegment, componentRegistry, pppiSegmentConfigRegistry } from "./nlmoutParseConfig";
import { parseInputToSections } from "../../nlmout-parse/sectionParser";

export default function testPage() {

    const tryparse = parseInputToSections(out);
    const pppiSegmentParser = createSegmentParserWithCustomRegistry(pppiSegmentConfigRegistry);

    return (
        <div>
            <DataDisplay />
            <h1 className="text-4xl text-center">
                {tryparse.map((section: Section, index) => (

                    <Accordion sx={{ md: 2 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {section.label}
                        </AccordionSummary>
                        <AccordionDetails>
                            {pppiSegmentParser(section.rawLines).map((segment: ExtendedSegment, index: number) => {
                                const Component = componentRegistry[segment.type];
                                return (
                                    <div key={index}>
                                        {Component ? <Component segment={segment} /> : <div>Unsupported row type: {segment.type}</div>}
                                    </div>
                                );
                            })}
                        </AccordionDetails>
                    </Accordion>
                ))}

            </h1>
        </div>
    );
}