"""Generate internal/sales/Sales_Pipeline.xlsx: every lead from enquiry to won/lost.

Run from the repo root:  python3 tools/make_pipeline.py
INTERNAL: contains estimated deal values. Never share.
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
INK, PAPER, LIME, MUTED, LINE = "0A0C0F", "EEF0EA", "C8FF2E", "464B45", "C9CCC4"
FONT = "Obel Mono"
MONEY, DATE = '#,##0', 'dd mmm yyyy'
INPUT = PatternFill("solid", fgColor="FFFBE6")
B = Border(bottom=Side(style="thin", color=LINE))

# Stage, default probability, meaning (matches the 11-step workflow)
STAGES = [
    ("1 Enquiry", 0.05, "Someone got in touch or was referred"),
    ("2 Fit check booked", 0.10, "30-min call in the calendar"),
    ("3 Intake / scoring", 0.20, "Intake workbook sent or returned; first read done"),
    ("4 Audit proposed", 0.30, "Route B: readiness audit quoted"),
    ("5 Proposal sent", 0.40, "Proposal + quotation sent"),
    ("6 Negotiating", 0.60, "Questions, scope or price under discussion"),
    ("7 Verbal yes", 0.80, "Agreed; SOW/contract being signed"),
    ("8 Won", 1.00, "Signed and deposit paid: move to delivery"),
    ("9 Lost", 0.00, "Said no or went quiet. Record the reason"),
    ("10 Not a fit", 0.00, "Referred out (route C)"),
    ("11 Nurture", 0.05, "Not now: check in again later"),
]
SECTORS = ["SME", "Corporate", "Public sector / GLC", "Non-profit", "Education", "Healthcare", "Startup", "Other"]
SOURCES = ["Website", "Referral", "LinkedIn", "Instagram", "Event", "Existing client", "Partner", "Cold outreach", "Other"]
SERVICES = ["Readiness audit", "Data platform", "Pipelines & integrations", "Dashboards", "Automation", "Custom tool", "AI integration", "AI training", "Support retainer", "Not sure yet"]
LOST = ["Price", "Timing / not now", "No budget", "Chose another vendor", "Did it in-house", "No response", "Not a fit", "Other"]


def f(size=9, bold=False, color=INK, italic=False):
    return Font(name=FONT, size=size, bold=bold, color=color, italic=italic)


def header(ws, row, cols):
    for i, (h, w) in enumerate(cols, start=1):
        c = ws.cell(row=row, column=i, value=h)
        c.font = f(9, True, PAPER)
        c.fill = PatternFill("solid", fgColor=INK)
        c.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[c.column_letter].width = w
    ws.row_dimensions[row].height = 32


def dv(ws, ref, src):
    v = DataValidation(type="list", formula1=src, allow_blank=True)
    ws.add_data_validation(v)
    v.add(ref)


def main():
    wb = Workbook()

    # ---------- Lists ----------
    ls = wb.active
    ls.title = "Lists"
    ls.sheet_view.showGridLines = False
    ls["A1"] = "Stage"; ls["B1"] = "Probability"; ls["C1"] = "Meaning"
    ls["E1"] = "Sector"; ls["F1"] = "Source"; ls["G1"] = "Service"; ls["H1"] = "Lost reason"
    for c in ("A1", "B1", "C1", "E1", "F1", "G1", "H1"):
        ls[c].font = f(9, True, PAPER); ls[c].fill = PatternFill("solid", fgColor=INK)
    for i, (s, p, m) in enumerate(STAGES, start=2):
        ls[f"A{i}"], ls[f"B{i}"], ls[f"C{i}"] = s, p, m
        ls[f"B{i}"].number_format = '0%'
    for col, items in (("E", SECTORS), ("F", SOURCES), ("G", SERVICES), ("H", LOST)):
        for i, v in enumerate(items, start=2):
            ls[f"{col}{i}"] = v
    for row in ls.iter_rows(min_row=2, max_row=20):
        for c in row:
            c.font = f(9)
    for col, w in zip("ABCDEFGH", [20, 11, 52, 2, 20, 16, 22, 22]):
        ls.column_dimensions[col].width = w
    n_st = len(STAGES) + 1

    # ---------- Pipeline ----------
    ws = wb.create_sheet("Pipeline", 0)
    ws.sheet_view.showGridLines = False
    ws["A1"] = "datawazi_  sales pipeline"; ws["A1"].font = f(14, True)
    ws["A2"] = "INTERNAL. One row per lead. Fill the pale-yellow cells; grey cells calculate. Today:"; ws["A2"].font = f(9, color=MUTED, italic=True)
    ws["H2"] = "=TODAY()"; ws["H2"].font = f(9, True); ws["H2"].number_format = DATE
    cols = [("ID", 8), ("Date in", 11), ("Organisation", 24), ("Contact", 18), ("Role", 14), ("Email / phone", 22), ("Sector", 14),
            ("Source", 13), ("Problem (their words)", 34), ("Service", 16), ("Stage", 17), ("Fit-check date", 11),
            ("Next action", 28), ("Next action due", 11), ("Est. value (RM)", 12), ("Probability", 10), ("Weighted (RM)", 12),
            ("Expected close", 11), ("Action status", 11), ("Lost reason", 16), ("Notes", 30)]
    hr = 4
    header(ws, hr, cols)
    inputs = set("ABCDEFGHIJKLMNORTU")
    N = 300
    for r in range(hr + 1, hr + 1 + N):
        for i in range(1, len(cols) + 1):
            c = ws.cell(row=r, column=i)
            c.font = f(9); c.border = B
            c.alignment = Alignment(vertical="top", wrap_text=c.column_letter in "IMU")
            if c.column_letter in inputs:
                c.fill = INPUT
        ws[f"A{r}"] = f'=IF(C{r}="","","L-"&TEXT(ROW()-{hr},"000"))'
        ws[f"A{r}"].fill = PatternFill(fill_type=None)
        for col in "BLNR":
            ws[f"{col}{r}"].number_format = DATE
        ws[f"O{r}"].number_format = MONEY
        ws[f"P{r}"] = f'=IF(K{r}="","",IFERROR(VLOOKUP(K{r},Lists!$A$2:$B${n_st},2,FALSE),""))'
        ws[f"P{r}"].number_format = '0%'
        ws[f"Q{r}"] = f'=IF(OR(O{r}="",P{r}=""),"",O{r}*P{r})'
        ws[f"Q{r}"].number_format = MONEY
        ws[f"S{r}"] = (f'=IF(OR(C{r}="",LEFT(K{r},1)="8",LEFT(K{r},1)="9",LEFT(K{r},2)="10"),"",'
                       f'IF(N{r}="","no action!",IF(N{r}<$H$2,"OVERDUE",IF(N{r}<=$H$2+2,"due soon","ok"))))')
    last = hr + N
    ws.freeze_panes = f"D{hr+1}"
    ws.auto_filter.ref = f"A{hr}:U{last}"
    dv(ws, f"G{hr+1}:G{last}", f"=Lists!$E$2:$E${len(SECTORS)+1}")
    dv(ws, f"H{hr+1}:H{last}", f"=Lists!$F$2:$F${len(SOURCES)+1}")
    dv(ws, f"J{hr+1}:J{last}", f"=Lists!$G$2:$G${len(SERVICES)+1}")
    dv(ws, f"K{hr+1}:K{last}", f"=Lists!$A$2:$A${n_st}")
    dv(ws, f"T{hr+1}:T{last}", f"=Lists!$H$2:$H${len(LOST)+1}")
    red, amber, green, grey = (PatternFill("solid", fgColor=c) for c in ("FFD9D6", "FFF1C2", "E3F9B5", "E6E6E6"))
    ws.conditional_formatting.add(f"S{hr+1}:S{last}", FormulaRule(formula=[f'OR(S{hr+1}="OVERDUE",S{hr+1}="no action!")'], fill=red, font=Font(name=FONT, bold=True, color="9B1C1C")))
    ws.conditional_formatting.add(f"S{hr+1}:S{last}", FormulaRule(formula=[f'S{hr+1}="due soon"'], fill=amber))
    ws.conditional_formatting.add(f"K{hr+1}:K{last}", FormulaRule(formula=[f'LEFT(K{hr+1},1)="8"'], fill=PatternFill("solid", fgColor=LIME)))
    ws.conditional_formatting.add(f"A{hr+1}:U{last}", FormulaRule(formula=[f'OR(LEFT($K{hr+1},1)="9",LEFT($K{hr+1},2)="10")'], font=Font(name=FONT, color="8A8F88")))

    # ---------- Summary ----------
    sm = wb.create_sheet("Summary", 1)
    sm.sheet_view.showGridLines = False
    sm["A1"] = "datawazi_  pipeline summary"; sm["A1"].font = f(14, True)
    sm["A2"] = "INTERNAL. Calculated from the Pipeline sheet."; sm["A2"].font = f(9, color=MUTED, italic=True)
    rng = lambda c: f"Pipeline!${c}${hr+1}:${c}${last}"
    kpis = [
        ("Open leads", f'=COUNTIFS({rng("C")},"<>",{rng("K")},"<>8 Won",{rng("K")},"<>9 Lost",{rng("K")},"<>10 Not a fit",{rng("K")},"<>11 Nurture")', '0'),
        ("Open pipeline value (RM)", f'=SUMPRODUCT(({rng("C")}<>"")*(LEFT({rng("K")},1)>="1")*(LEFT({rng("K")},1)<="7")*(LEN({rng("K")})>0)*N(+{rng("O")}))', MONEY),
        ("Weighted pipeline (RM)", f'=SUMPRODUCT(({rng("C")}<>"")*(VALUE(LEFT({rng("K")}&"0",FIND(" ",{rng("K")}&" ")-1)&"")<=7)*N(+{rng("Q")}))', MONEY),
        ("Won this year (count)", f'=COUNTIFS({rng("K")},"8 Won",{rng("R")},">="&DATE(YEAR(TODAY()),1,1))', '0'),
        ("Won this year (RM)", f'=SUMIFS({rng("O")},{rng("K")},"8 Won",{rng("R")},">="&DATE(YEAR(TODAY()),1,1))', MONEY),
        ("Win rate (won ÷ won + lost)", f'=IFERROR(COUNTIF({rng("K")},"8 Won")/(COUNTIF({rng("K")},"8 Won")+COUNTIF({rng("K")},"9 Lost")),"")', '0%'),
        ("Next actions overdue / missing", f'=COUNTIF({rng("S")},"OVERDUE")+COUNTIF({rng("S")},"no action!")', '0'),
        ("Fit checks this month", f'=COUNTIFS({rng("L")},">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),{rng("L")},"<="&TODAY())', '0'),
    ]
    sm.column_dimensions["A"].width = 34; sm.column_dimensions["B"].width = 16
    for i, (k, v, fmt) in enumerate(kpis, start=4):
        sm[f"A{i}"] = k; sm[f"A{i}"].font = f(10)
        sm[f"B{i}"] = v; sm[f"B{i}"].font = f(11, True); sm[f"B{i}"].number_format = fmt; sm[f"B{i}"].border = B
        sm[f"B{i}"].alignment = Alignment(horizontal="right")
    # weighted pipeline: simpler robust formula (sum weighted of stages 1-7)
    sm["B6"] = "=" + "+".join(f'SUMIFS({rng("Q")},{rng("K")},"{s}")' for s, _, _ in STAGES[:7])
    sm["B5"] = "=" + "+".join(f'SUMIFS({rng("O")},{rng("K")},"{s}")' for s, _, _ in STAGES[:7])
    sm["B4"] = "=" + "+".join(f'COUNTIF({rng("K")},"{s}")' for s, _, _ in STAGES[:7])

    r0 = 14
    for col, h in zip("ABCD", ["By stage", "Leads", "Value (RM)", "Weighted (RM)"]):
        sm[f"{col}{r0}"] = h; sm[f"{col}{r0}"].font = f(9, True, PAPER); sm[f"{col}{r0}"].fill = PatternFill("solid", fgColor=INK)
    sm.column_dimensions["C"].width = 14; sm.column_dimensions["D"].width = 14
    for i, (s, _, _) in enumerate(STAGES, start=r0 + 1):
        sm[f"A{i}"] = s
        sm[f"B{i}"] = f'=COUNTIF({rng("K")},A{i})'
        sm[f"C{i}"] = f'=SUMIFS({rng("O")},{rng("K")},A{i})'
        sm[f"D{i}"] = f'=SUMIFS({rng("Q")},{rng("K")},A{i})'
        for col in "ABCD":
            sm[f"{col}{i}"].font = f(9); sm[f"{col}{i}"].border = B
        sm[f"C{i}"].number_format = sm[f"D{i}"].number_format = MONEY
    r1 = r0 + len(STAGES) + 3
    for col, h in zip("ABC", ["By source", "Leads", "Won"]):
        sm[f"{col}{r1}"] = h; sm[f"{col}{r1}"].font = f(9, True, PAPER); sm[f"{col}{r1}"].fill = PatternFill("solid", fgColor=INK)
    for i, src in enumerate(SOURCES, start=r1 + 1):
        sm[f"A{i}"] = src
        sm[f"B{i}"] = f'=COUNTIF({rng("H")},A{i})'
        sm[f"C{i}"] = f'=COUNTIFS({rng("H")},A{i},{rng("K")},"8 Won")'
        for col in "ABC":
            sm[f"{col}{i}"].font = f(9); sm[f"{col}{i}"].border = B

    # ---------- How to use ----------
    g = wb.create_sheet("How to use")
    g.sheet_view.showGridLines = False
    g.column_dimensions["A"].width = 115
    tips = [
        ("How to use the sales pipeline", True),
        ("Add a row for every enquiry, the day it arrives (website, referral, LinkedIn, Instagram, event...). The ID fills in automatically.", False),
        ("Always fill 'Next action' and 'Next action due'. Every open lead needs one; the Action status column turns red when it's missing or overdue.", False),
        ("Move 'Stage' as the lead progresses. Probability and weighted value fill in from the Lists tab (edit probabilities there).", False),
        ("Est. value: your best guess of the first project's fee, from internal/pricing/PRICING.md. Update it once the quotation is sent.", False),
        ("Won = SOW signed and deposit paid: start delivery (delivery/README.md) and log invoices in internal/finance/Payment_Tracker.xlsx.", False),
        ("Lost / Not a fit: always pick a Lost reason. Review reasons every quarter to improve offers and pricing.", False),
        ("Nurture: not now. Set a next action 2–3 months out (e.g. 'check in', share an article or case study).", False),
        ("Weekly (Monday, 15 min): filter Action status to OVERDUE, do or reschedule each action, update stages.", False),
        ("PDPA: this file holds personal contact details. Keep it in approved storage only, and delete leads older than 2 years that never became work.", False),
    ]
    for i, (t, b) in enumerate(tips, start=1):
        g[f"A{i}"] = t; g[f"A{i}"].font = f(11 if b else 10, b)
        g[f"A{i}"].alignment = Alignment(wrap_text=True)

    out = ROOT / "internal/sales/Sales_Pipeline.xlsx"
    out.parent.mkdir(parents=True, exist_ok=True)
    wb.save(out)
    print("wrote", out.relative_to(ROOT))


if __name__ == "__main__":
    main()
