import { BrightnessLowOutlined } from "@mui/icons-material"
import { linearProgressClasses } from "@mui/material"

export const out1: string[] = [
    "------------------------- HEADING 1 ----------------------",
    "TERM OF SUPERVISED RELEASE.....:   5 YEARS                      ",
    "RELATIONSHIP OF THIS OBLIGATION                             ",
    " TO OTHERS FOR THE OFFENDER.....:  CC                             ",
    "DATE OF OFFENSE.................:   01/01/2000         ",
    "DATE OF SUPERMAN ...............:   01/01/2000         ",
]

export const out: string[] = [
    "------------------------- HEADING 1 ----------------------",
    "                  IN THE MIDDLE OF THE PAGE             ", // <-- centered line
    "                                                        ", // <--- empty line
    "LABEL.....................: VALUE                       ",
    "ANOTHER LABLE.............: ANOTHER VALUE               ",
    "             PHONE: N   CONTACT: Y                      ",// <-- 2 LABEL/VALUE centered
    "                                                        ",
    "                      COL1     COL2     COL3            ", // <-- 3 column header
    "CATEGORY1.: FOO       VAL1     $100.00  VAL3            ", // <-- first row of categorical table
    "CAT2......: BAR       VAL2     $10.00   VAL5            ", // <-- second row of categorical table
    "CAT5ADF...: BAZ       VAL12    $1.00    VALX            ", // <-- second row of categorical table
    "                                                        ", // <-- category table ends with empty line always
    "------------------------- HEADING 2 --------------------",
    "FREE FORM NOT IN THE MIDDLE OF THE PAGE                 ",
    "                                                        ",
    "PHONE: N   CONTACT: Y   SUBJECT: 1234   EMAIL:           ",  // <-- 4 LABEL/VALUE last one has no value for email
    "PROPERTY..........: MY PROPS    CUSTOMER....: LAST CALL  ",  // <-- 4 LABEL/VALUE last one has no value for email
    "STREET NAME.......: JACKSON ST  ZIP.........: 22554       ",  // <-- 4 LABEL/VALUE last one has no value for email
    "                                                           ",
    "--------  CURRENT OBLIGATIONS NO: 010 --------------------",
    "OFFENSE CODE...:  391    21:846 SEC 841-851 ATTEMPT       ",
    "OFF/CHG: COMPSPIRCAY TO POSSES AND DISTUBUTE & POSSESS W/INTENT TO DISTRIBUTE",
    "         TO DISTUBUTE COCAI, 21 USC 846, 812 & 841-851   ",
    "                                                          ",
    "SENTENCE PROJ.......:  120 MONTHS  5 YEARS SUPERVISED RELEASE",
    "                 PHONE: N/A   FAX: N/A                      ",
    "SENTENCE IMPOSED/TIME TO SERVE.:   240 MONTHS               ",
    "TERM OF SUPERVISED RELEASE.....:   5 YEARS                      ",
    "RELATIONSHIP OF THIS OBLIGATION                             ",
    " TO OTHERS FOR THE OFFENDER.....:  CC                             ",
    "DATE OF OFFENSE.................:   01/01/2000         ",
    "DATE OF SUPERMAN ...............:   01/01/2000         ",
    "                                                     ",
    "JAIL CREDIT........:  FROM DATE     THRU DATE         ",
    "                      04-16-1996    05-16-1996       ",
    "                      06-16-1996    06-23-1996       ",
    "                      06-16-1996                     ",
    "                                    06-23-1996       ",
    "                                                     ",
    "                  COL1 ASSES     COLX     COL3            ",
    "CATEGORY1.:       VAL1           $100.00  VAL3            ",
    "  CAT2....:       VAL2           $10.00                    ",
    "  CAT5ADF.:       VAL12                                ",
    "                                                        ",
    "                                                        ",
    "--------  CURRENT COMPUTAITON NO: 020 --------------------",
    "OFFENSE CODE...:  391    21:846 SEC 841-851 ATTEMPT       ",
    "OFF/CHG: ASSULT WITH INTENT TO COMMIT                     ",
    "         VERIFYING ORGANIZED CRIME ACTIVITY               ",
    "                                                           ",
    "SENTENCE IMPOSED/TIME TO SERVE.:   12 MONTHS               ",
    "TERM OF SUPERVISED RELEASE.:   5 YEARS                      ",
    "                 PHONE: N/A   FAX: N/A                      ",
    "                                                    ",
    "RESTITUTION...:   PROPERTY:  NO  SERVICES:  NO        AMOUNT: $0.00  ",
    "RESTITUTION...:   PROPERTY:  YES SERVICES:  YES       AMOUNT: $0.00  ",
    "",
    "                      COL1     COL2   COL3   COL4           ",
    "CAT5ADF......:        VAL12    $1.00  VALX   VALX           ",
    "CAT6ADF......:                 $1.00    VALX                ",
    "CAT7ADF......:                                              ",
    "                                            ",
    "                             FELONY ASSES  MISDMNR ASSESS  FINERS       COSTS  ",
    "------------------------------- EDUCATION INFORMATION -------------------------",
    "FACL ASSIGNMENT DESCRIPTION                    START DATE/TIME STOP DATE/TIME  ",
    "SPG  ESL HAS    ENGLISH PROFICIENCY            01/01/2000 1645 CURRENT         ",
    "SPG  GED UNSAT  GED PROGRESS UNSATISFACTORY    01/01/2012 1645 CURRENT         ",
    "SPG  GED XN     EXEMPT GED NON-PROMOTABLE      01/01/2012 1645 CURRENT         ",
    "                                                                               ",
    "------------------------------- EDUCATION COURSES -----------------------------",
    "SUB-FACL   DESCRIPTION                    START DATE  STOP DATE EVNT AC LV  HRS",
    "LEW        GENERAL EDUCATION 1            07-01-2016 08-17-2016               0",
    "LEW        GENERAL EDUCATION 1            07-01-2013 08-17-2017               0",
    "SEA DRUG   UNDERWATER JUMP                07-01-2013 CURRENT                   ",
    "LOM        GENERAL EDUCATION 3            07-01-2013 08-17-2017   C  W  I     0",
    "LOM        GED 1                          07-01-2013 08-17-2017   C  W  V    10",
    "                                                                               ",
    "------------------------------- INTERVIEW OUTPUT-------------------------------",
    "INTERVIEW DATE..: 09-23-2009                                                   ",
    "PRIMARY LANGUAGE: SPANISH                                                      ",
    "HIGH GRADE COMPL: 12   H.S. GRADUATE OR GED                                    ",
    "                                                                               ",
    "INTERVIEWED BY..: LEX-RBT                                                      ",
    "INTERVIEW FACL..: ERE-EL RENO                                                  ",
    "                                                                               ",
    "INTEREST: ( VT BUILDING TRADES; ACE COURSES                                )   ",
    "                                                                               ",
    "REMARKS: ( ON WAITING LIST FOR VT BUILDING TRADES;                         )   ",
    "         (                                                                 )   ",
    "                                                                               ",
    "------------------------------- LITERACY PROGRAM ------------------------------",
    "11-06-2022 /REVIEW /CXB            /DAN                                        ",
    "                  TYPE: 240 HOURS  (TESTING                                 )  ",
    "                                   (SOME SECOND TEST                        )  ",
    "11-02-2022 /WITHDRAWL /CXB         /DAN                                        ",
    "                  REAS: HEALTH     (TESTING                                 )  ",
    "                  PROG: FAIR       (PROGRESS IS FAIR                        )  ",
    "                  REEN: OTHER      (TESTING                                 )  ",
    "11-03-2022 /REVIEW /CXB            /DAN                                        ",
    "                  TYPE: 240 HOURS  (INIT LITERACY REVIEW                    )  ",
    "                                                                               ",
    "------------------------------- ESL PROGRAM -----------------------------------",
    "05-11-2024 /REVIEW /CXB            /DAN                                        ",
    "                  TYPE: OTHER      (TESTING                                 )  ",
    "                                   (SOME SECOND TEST                        )  ",
    "                                   (REVIEW                                  )  ",
    "11-07-2024 /REVIEW /CXB            /DAN                                        ",
    "                                                                               ",
    "------------------------------- EXEMPTION EXAMPLE -----------------------------",
    "REQUEST DT PROGRAM    EXEMPTION  REASON     APPROVAL STATUS /   DATE    FCL UPD",
    "---------- ---------- ---------- ---------- ---------------- ---------- -------",
    "11-08-2022 LITERACY   CLASS      GOOD CAUSE WAITING APPROVAL              DAN  ",
    "                COND: SPECIFY ANY CONDITIONS WITH REGARDS TO THE EXE.          ",
    "                RMKS: UPDATED THE REASON FOR THE EXEMPT INPUT FIELD.           ",
    "                      TEXT ENTERED INTO THE REMARKS FIELD.                     ",
    "11-08-2022 ESL        CLASS      GOOD CAUSE  APPROVAL        11-10-2012   DAN  ",
    "                COND: SPECIFY ANY CONDITIONS WITH REGARDS TO THE EXE.          ",
    "                RMKS: UPDATED THE REASON FOR THE EXEMPT INPUT FIELD.           ",
    "                      TEXT ENTERED INTO REMARKS FIELD.                         ",


    // todo: RESTITUTION AND OFFENSE CODE...: CUSTOM PROCESSORS.

]

interface Restitution {
    property: boolean;
    services: boolean;
    amount: number;
}
// TYPESCRIPT ONLY PLEASE:
// BASED OF THE FOLLOWING STRING,
// INEED A FUNCTION THAT WILL RETURN  a string array based on indexes of hte main string.
// instead of a number array, the input will be complete sample String.
// 



