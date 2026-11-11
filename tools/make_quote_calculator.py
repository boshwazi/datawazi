"""Generate internal/pricing/Quote_Calculator.xlsx (INTERNAL): days x day rate -> price + payment schedule.

Run from the repo root:  python3 tools/make_quote_calculator.py
Rates and rules mirror internal/pricing/PRICING.md: change both together.
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
INK, PAPER, LIME, MUTED, LINE = "0A0C0F", "EEF0EA", "C8FF2E", "464B45", "C9CCC4"
FONT = "Obel Mono"
MONEY = '"RM "#,##0'
INPUT = PatternFill("solid", fgColor="FFFBE6")
INKF = PatternFill("solid", fgColor=INK)
LIMEF = PatternFill("solid", fgColor=LIME)
B = Border(bottom=Side(style="thin", color=LINE))

RATES = [("Community", 1500, "Non-profits, education, early-stage startups"),
         ("SME", 1600, "SMEs (< ~RM50m revenue)"),
         ("Standard", 1750, "Default"),
         ("Enterprise / GLC", 2200, "Corporates, GLCs, government"),
         ("Specialist", 2600, "Exec strategy, AI architecture, assurance")]
TYPES = [("Advisory", 0.0), ("Build: clear scope", 0.15), ("Build: messy / many sources", 0.25), ("Training", 0.0), ("Retainer", 0.0)]
SCHEDULES = {
    "100% upfront": [("On signing", 1.0)],
    "50 / 50": [("On signing (before kickoff)", 0.5), ("On go-live / UAT sign-off", 0.5)],
    "40 / 40 / 20": [("On signing (before kickoff)", 0.4), ("Design sign-off / build complete", 0.4), ("On go-live", 0.2)],
    "GLC 30 / 30 / 30 / 10": [("Milestone 1 (after PO)", 0.3), ("Milestone 2", 0.3), ("Milestone 3 / UAT", 0.3), ("Go-live", 0.1)],
}
PACKAGES = [
    ("Data health check (entry)", "Advisory", "2", "3,500 fixed"),
    ("Readiness audit S / M / L", "Advisory", "5 / 8 / 12–15", "9,000 / 14,000 / 26.5–33k (Ent.)"),
    ("Strategy & roadmap", "Advisory", "10–15", "22–39k"),
    ("Tool / vendor selection", "Advisory", "5–8", "9–14k"),
    ("AI governance & usage policy", "Advisory", "3–4", "5.5–7k"),
    ("Second opinion / assurance", "Advisory (Specialist)", "2–3", "5–8k"),
    ("Advisory retainer", "Retainer", "2 or 4 d/mo", "4,000 / 7,500 per month"),
    ("Dashboard S / M", "Build", "5 / 10–12", "10,000 / 20–24k"),
    ("Automation S / M", "Build", "3 / 6–8", "6,000 / 12–16k"),
    ("Pipelines & integrations", "Build", "4–6 per source", "8–12k per source"),
    ("Data platform S / M / L", "Build", "20 / 35 / 50+", "40.5k / 70.5k / 100.5k+"),
    ("AI assistant S / M", "Build", "8 / 18–22", "16k / 36–44.5k"),
    ("Custom tool", "Build", "8–30", "16–60.5k"),
    ("AI workshop half / full day", "Training", "per session", "4,500 / 8,500"),
    ("Leadership AI briefing", "Training", "2–3 hours", "5,000"),
    ("Support Essential / Standard / Priority", "Retainer", "8 / 16 / 32 h", "2,500 / 4,500 / 8,000 per month"),
]


def f(size=10, bold=False, color=INK, italic=False):
    return Font(name=FONT, size=size, bold=bold, color=color, italic=italic)


def put(ws, ref, v, size=10, bold=False, color=INK, fmt=None, fill=None, italic=False, align=None):
    c = ws[ref]; c.value = v; c.font = f(size, bold, color, italic)
    if fmt: c.number_format = fmt
    if fill: c.fill = fill
    if align: c.alignment = Alignment(horizontal=align, vertical="center", wrap_text=True)
    return c


def dv(ws, ref, src):
    v = DataValidation(type="list", formula1=src, allow_blank=False)
    ws.add_data_validation(v); v.add(ref)


def main():
    wb = Workbook()
    # ---------- Rates (reference + lookup tables) ----------
    rt = wb.active; rt.title = "Rates"; rt.sheet_view.showGridLines = False
    put(rt, "A1", "Day rates (edit here; keep PRICING.md in step)", 12, True)
    for col, h in zip("ABC", ["Client type", "RM / day", "Use for"]):
        put(rt, f"{col}3", h, 9, True, PAPER, fill=INKF)
    for i, (n, r, u) in enumerate(RATES, start=4):
        put(rt, f"A{i}", n); put(rt, f"B{i}", r, fmt=MONEY, fill=INPUT); put(rt, f"C{i}", u, 9, color=MUTED)
    r_last = 3 + len(RATES)
    put(rt, "E3", "Engagement type", 9, True, PAPER, fill=INKF); put(rt, "F3", "Risk buffer", 9, True, PAPER, fill=INKF)
    for i, (n, b) in enumerate(TYPES, start=4):
        put(rt, f"E{i}", n); put(rt, f"F{i}", b, fmt='0%', fill=INPUT)
    t_last = 3 + len(TYPES)
    put(rt, "H3", "Schedule", 9, True, PAPER, fill=INKF)
    for i, n in enumerate(SCHEDULES, start=4):
        put(rt, f"H{i}", n)
    s_last = 3 + len(SCHEDULES)
    put(rt, "A12", "Other rules", 9, True, PAPER, fill=INKF); put(rt, "B12", "", fill=INKF)
    rules = [("Rush surcharge", 0.25, '0%'), ("Multi-phase discount (later phases)", 0.10, '0%'), ("Case-study discount (max)", 0.10, '0%'),
             ("Minimum engagement", 3500, MONEY), ("Floor: effective day rate", 1500, MONEY), ("Round to nearest", 500, MONEY)]
    for i, (n, v, fm) in enumerate(rules, start=13):
        put(rt, f"A{i}", n); put(rt, f"B{i}", v, fmt=fm, fill=INPUT)
    for col, w in zip("ABCDEFGH", [36, 12, 44, 2, 30, 12, 2, 24]):
        rt.column_dimensions[col].width = w

    # ---------- Quote ----------
    q = wb.create_sheet("Quote", 0); q.sheet_view.showGridLines = False
    for col, w in zip("ABCDEF", [4, 46, 10, 16, 4, 30]):
        q.column_dimensions[col].width = w
    put(q, "B1", "datawazi_  quote calculator", 14, True)
    put(q, "B2", "INTERNAL. Fill the pale-yellow cells. Copy the result into the Quotation template.", 9, color=MUTED, italic=True)
    inputs = [("Client", "{{CLIENT}}", None), ("Client type", "Standard", None), ("Engagement type", "Build: clear scope", None),
              ("Risk buffer (auto, override if needed)", "=IFERROR(VLOOKUP(C6,Rates!$E$4:$F$%d,2,FALSE),0)" % t_last, '0%'),
              ("Rush? (start < 5 working days / weekends)", "No", None), ("Multi-phase discount?", "No", None),
              ("Case-study discount (0–10%)", 0, '0%'), ("Payment schedule", "50 / 50", None)]
    for i, (lab, v, fm) in enumerate(inputs, start=4):
        put(q, f"B{i}", lab)
        c = put(q, f"C{i}", v, bold=True, fmt=fm, fill=INPUT)
        q.merge_cells(f"C{i}:D{i}")
    dv(q, "C5", f"=Rates!$A$4:$A${r_last}")
    dv(q, "C6", f"=Rates!$E$4:$E${t_last}")
    dv(q, "C8", '"Yes,No"'); dv(q, "C9", '"Yes,No"')
    dv(q, "C11", f"=Rates!$H$4:$H${s_last}")
    put(q, "B12", "Day rate", color=MUTED); put(q, "C12", f'=IFERROR(VLOOKUP(C5,Rates!$A$4:$B${r_last},2,FALSE),0)', bold=True, fmt=MONEY)

    # tasks
    hr = 14
    for col, h in zip("ABCD", ["#", "Task / deliverable", "Days", "Cost at day rate"]):
        put(q, f"{col}{hr}", h, 9, True, PAPER, fill=INKF)
    examples = [("Discovery & solution design", 3), ("Pipelines: 2 sources", 8), ("Data model & warehouse", 5), ("Dashboards (3 pages)", 4),
                ("Testing & reconciliation (UAT)", 2), ("Documentation, training & handover", 2), ("Project management (≈10%)", 2)]
    N = 15
    for k in range(N):
        r = hr + 1 + k
        put(q, f"A{r}", k + 1, 9, color=MUTED)
        lab, d = examples[k] if k < len(examples) else (None, None)
        put(q, f"B{r}", lab, italic=lab is not None, color=MUTED if lab else INK, fill=INPUT)
        put(q, f"C{r}", d, fmt='0.0', fill=INPUT)
        put(q, f"D{r}", f'=IF(C{r}="","",C{r}*$C$12)', fmt=MONEY)
        for col in "ABCD":
            q[f"{col}{r}"].border = B
    t0 = hr + 1; t1 = hr + N
    r = t1 + 2
    calc = [
        ("Total days", f"=SUM(C{t0}:C{t1})", '0.0'),
        ("Base (days × day rate)", f"=SUM(D{t0}:D{t1})", MONEY),
        ("+ Risk buffer", f"=D{r+1}*C7", MONEY),
        ("+ Rush surcharge", f'=IF(C8="Yes",(D{r+1}+D{r+2})*Rates!$B$13,0)', MONEY),
        ("- Multi-phase discount", f'=IF(C9="Yes",-(D{r+1}+D{r+2}+D{r+3})*Rates!$B$14,0)', MONEY),
        ("- Case-study discount", f"=-(D{r+1}+D{r+2}+D{r+3})*MIN(C10,Rates!$B$15)", MONEY),
        ("Price before rounding", f"=SUM(D{r+1}:D{r+5})", MONEY),
        ("QUOTE PRICE (excl. SST, third-party costs)", f"=MAX(Rates!$B$16,ROUND(D{r+6}/Rates!$B$18,0)*Rates!$B$18)", MONEY),
        ("Effective day rate", f'=IF(D{r}=0,"",D{r+7}/D{r})', MONEY),
    ]
    for i, (lab, fm_, fmt) in enumerate(calc):
        rr = r + i
        put(q, f"B{rr}", lab, bold=(i == 7))
        c = put(q, f"D{rr}", fm_, bold=(i in (0, 7)), fmt=fmt, align="right")
        q[f"B{rr}"].border = q[f"D{rr}"].border = B
    price_row = r + 7
    q[f"B{price_row}"].fill = LIMEF; q[f"C{price_row}"].fill = LIMEF; q[f"D{price_row}"].fill = LIMEF
    q[f"D{price_row}"].font = f(13, True)
    eff = r + 8
    put(q, f"F{eff}", f'=IF(D{eff}="","",IF(D{eff}<Rates!$B$17,"⚠ below floor: cut scope, not rate","ok"))', 9, bold=True, color="9B1C1C")
    put(q, f"F{price_row}", f'=IF(D{price_row}=Rates!$B$16,"minimum engagement applied","")', 9, color=MUTED, italic=True)

    # payment schedule
    ps = eff + 2
    put(q, f"B{ps}", "Payment schedule", 9, True, PAPER, fill=INKF); put(q, f"C{ps}", "%", 9, True, PAPER, fill=INKF); put(q, f"D{ps}", "Amount", 9, True, PAPER, fill=INKF)
    max_rows = max(len(v) for v in SCHEDULES.values())
    names = list(SCHEDULES)
    for j in range(max_rows):
        rr = ps + 1 + j
        lab_f = "=" + "".join(f'IF($C$11="{n}",{json_str(SCHEDULES[n][j][0]) if j < len(SCHEDULES[n]) else chr(34)+chr(34)},' for n in names) + '""' + ")" * len(names)
        pct_f = "=" + "".join(f'IF($C$11="{n}",{SCHEDULES[n][j][1] if j < len(SCHEDULES[n]) else chr(34)+chr(34)},' for n in names) + '""' + ")" * len(names)
        put(q, f"B{rr}", lab_f)
        put(q, f"C{rr}", pct_f, fmt='0%')
        put(q, f"D{rr}", f'=IF(C{rr}="","",ROUND($D${price_row}*C{rr},0))', fmt=MONEY)
        for col in "BCD":
            q[f"{col}{rr}"].border = B
    put(q, f"B{ps+max_rows+2}", "Rules: no work before the first payment clears · audits & workshops 100% upfront · retainers monthly in advance (min. 3 months) · GLC: PO first.", 8, color=MUTED, italic=True)

    # ---------- Packages ----------
    pk = wb.create_sheet("Packages"); pk.sheet_view.showGridLines = False
    put(pk, "A1", "Package reference (Standard rate). Full detail: internal/pricing/PRICING.md", 11, True)
    for col, h, w in zip("ABCD", ["Package", "Type", "Typical days", "Price (RM)"], [40, 20, 18, 34]):
        put(pk, f"{col}3", h, 9, True, PAPER, fill=INKF); pk.column_dimensions[col].width = w
    for i, row in enumerate(PACKAGES, start=4):
        for col, v in zip("ABCD", row):
            put(pk, f"{col}{i}", v, 9); pk[f"{col}{i}"].border = B

    out = ROOT / "internal/pricing/Quote_Calculator.xlsx"
    wb.save(out)
    print("wrote", out.relative_to(ROOT))


def json_str(s):
    return '"' + s.replace('"', '""') + '"'


if __name__ == "__main__":
    main()
