"""Generate datawazi billing spreadsheets.

  sales/billing/Invoice_Template.xlsx     client-facing invoice (formulas for totals and due date)
  sales/billing/Quotation_Template.xlsx   client-facing quotation with payment schedule
  internal/finance/Payment_Tracker.xlsx   internal: every invoice, what's paid, what's overdue

Run from the repo root:  python3 tools/make_billing.py
No prices or rates are written into the templates (CLAUDE.md pricing rule): amounts are filled per client.
Bank details are {{PLACEHOLDERS}} until the business account is open.
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.drawing.image import Image as XLImage
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
INK, PAPER, LIME, MUTED, LINE = "0A0C0F", "EEF0EA", "C8FF2E", "464B45", "C9CCC4"
FONT = "Obel Mono"
LOGO = ROOT / "brand/logo/datawazi-wordmark-on-light.png"
MONEY = '#,##0.00'
DATE = 'dd mmm yyyy'

thin = Side(style="thin", color=LINE)
B_ALL = Border(left=thin, right=thin, top=thin, bottom=thin)
B_BOTTOM = Border(bottom=thin)
INPUT_FILL = PatternFill("solid", fgColor="FFFBE6")  # pale yellow = fill me in


def f(size=10, bold=False, color=INK, italic=False):
    return Font(name=FONT, size=size, bold=bold, color=color, italic=italic)


def put(ws, ref, value, size=10, bold=False, color=INK, align=None, fmt=None, fill=None, italic=False, wrap=False):
    c = ws[ref]
    c.value = value
    c.font = f(size, bold, color, italic)
    if align or wrap:
        c.alignment = Alignment(horizontal=align, vertical="top", wrap_text=wrap)
    if fmt:
        c.number_format = fmt
    if fill:
        c.fill = fill
    return c


def page_setup(ws, landscape=False, one_page=True):
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.page_setup.orientation = "landscape" if landscape else "portrait"
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 1 if one_page else 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_options.horizontalCentered = True
    ws.page_margins.left = ws.page_margins.right = 0.5
    ws.page_margins.top = ws.page_margins.bottom = 0.6
    ws.sheet_view.showGridLines = False


def logo(ws, anchor="B2", width_px=190):
    img = XLImage(str(LOGO))
    ratio = img.height / img.width
    img.width, img.height = width_px, int(width_px * ratio)
    ws.add_image(img, anchor)


def seller_block(ws, row):
    put(ws, f"B{row}", "{{REGISTERED_NAME}}  ({{SSM_REG_NO}})", 9, color=MUTED)
    put(ws, f"B{row+1}", "{{BUSINESS_ADDRESS}}", 9, color=MUTED)
    put(ws, f"B{row+2}", "hello@datawazi.com  ·  datawazi.com", 9, color=MUTED)


def doc_header(ws, title, meta):
    """meta: list of (label, value, fmt, is_input)"""
    for col, w in zip("ABCDEFG", [2, 5, 36, 8, 20, 25, 2]):
        ws.column_dimensions[col].width = w
    logo(ws)
    put(ws, "F2", title, 20, bold=True, align="right")
    seller_block(ws, 6)
    r = 6
    for label, value, fmt, is_input in meta:
        put(ws, f"E{r}", label, 9, color=MUTED, align="right")
        c = put(ws, f"F{r}", value, 9, bold=True, align="right", fmt=fmt)
        if is_input:
            c.fill = INPUT_FILL
        r += 1
    return r


def bill_to(ws, row, label):
    put(ws, f"B{row}", label, 9, bold=True, color=MUTED)
    lines = ["{{CLIENT_LEGAL_NAME}}", "Attn: {{CONTACT_NAME}}, {{CONTACT_ROLE}}", "{{CLIENT_ADDRESS}}", "{{CLIENT_EMAIL}}"]
    for i, t in enumerate(lines):
        c = put(ws, f"B{row+1+i}", t, 10, bold=(i == 0))
        ws.merge_cells(f"B{row+1+i}:D{row+1+i}")
        c.fill = INPUT_FILL
    return row + 1 + len(lines)


def line_items(ws, row, n=10):
    heads = ["#", "Description", "Qty", "Unit price (RM)", "Amount (RM)"]
    for col, h in zip("BCDEF", heads):
        c = put(ws, f"{col}{row}", h, 9, bold=True, color=PAPER, align="right" if col in "DEF" else None)
        c.fill = PatternFill("solid", fgColor=INK)
    first = row + 1
    for i in range(n):
        r = first + i
        put(ws, f"B{r}", i + 1 if i < 3 else None, 9, color=MUTED)
        for col in "CDE":
            ws[f"{col}{r}"].fill = INPUT_FILL
            ws[f"{col}{r}"].font = f(10)
        ws[f"C{r}"].alignment = Alignment(wrap_text=True, vertical="top")
        ws[f"D{r}"].number_format = '0.##'
        ws[f"E{r}"].number_format = MONEY
        put(ws, f"F{r}", f'=IF(OR(D{r}="",E{r}=""),"",D{r}*E{r})', 10, fmt=MONEY, align="right")
        for col in "BCDEF":
            ws[f"{col}{r}"].border = B_BOTTOM
    put(ws, f"C{first}", "{{e.g. Data platform build: milestone 1 of 3 (deposit), per SOW-001}}", 10, italic=True, color=MUTED)
    ws[f"C{first}"].fill = INPUT_FILL
    return first, first + n - 1


def totals(ws, first, last, row, label_total):
    put(ws, f"E{row}", "Subtotal", 10, align="right")
    put(ws, f"F{row}", f"=SUM(F{first}:F{last})", 10, fmt=MONEY, align="right")
    put(ws, f"E{row+1}", "SST rate", 10, align="right")
    c = put(ws, f"F{row+1}", 0, 10, fmt='0%', align="right")
    c.fill = INPUT_FILL
    put(ws, f"C{row+1}", "Leave SST at 0% unless datawazi is SST-registered.", 8, italic=True, color=MUTED)
    put(ws, f"E{row+2}", "SST", 10, align="right")
    put(ws, f"F{row+2}", f"=ROUND(F{row}*F{row+1},2)", 10, fmt=MONEY, align="right")
    put(ws, f"E{row+3}", label_total, 11, bold=True, align="right")
    c = put(ws, f"F{row+3}", f"=F{row}+F{row+2}", 12, bold=True, fmt='"RM "#,##0.00', align="right")
    c.fill = PatternFill("solid", fgColor=LIME)
    ws[f"E{row+3}"].fill = PatternFill("solid", fgColor=LIME)
    return row + 3


def make_invoice():
    wb = Workbook()
    ws = wb.active
    ws.title = "Invoice"
    page_setup(ws)
    r = doc_header(ws, "INVOICE", [
        ("Invoice no.", "DW-INV-{{YYYY}}-{{NNN}}", None, True),
        ("Invoice date", None, DATE, True),
        ("Payment terms (days)", 14, '0" days"', True),
        ("Due date", '=IF(F7="","",F7+F8)', DATE, False),
        ("PO no. (if any)", "{{PO_NUMBER}}", None, True),
        ("SOW / quote ref.", "{{SOW_NUMBER}}", None, True),
    ])
    r = bill_to(ws, 13, "BILL TO")
    c = put(ws, f"B{r+1}", "Project: {{PROJECT_TITLE}}  ·  {{MILESTONE e.g. Deposit / Milestone 2 / Final / Retainer Nov 2026}}", 10, bold=True, wrap=True)
    ws.merge_cells(f"B{r+1}:F{r+1}")
    ws.row_dimensions[r + 1].height = 28
    c.fill = INPUT_FILL
    first, last = line_items(ws, r + 3)
    t = totals(ws, first, last, last + 2, "AMOUNT DUE")
    c = put(ws, f"B{t+1}", "Ringgit Malaysia: {{AMOUNT_IN_WORDS}} only", 9, italic=True)
    ws.merge_cells(f"B{t+1}:F{t+1}")
    c.fill = INPUT_FILL

    p = t + 3
    put(ws, f"B{p}", "PAYMENT DETAILS", 9, bold=True, color=MUTED)
    details = [("Bank", "{{BANK_NAME}}"), ("Account name", "{{ACCOUNT_NAME}}"), ("Account no.", "{{ACCOUNT_NUMBER}}"),
               ("SWIFT (overseas)", "{{SWIFT_CODE}}"), ("DuitNow ID (optional)", "{{DUITNOW_ID}}"), ("Payment reference", "=F6")]
    for i, (k, v) in enumerate(details):
        put(ws, f"B{p+1+i}", k, 9, color=MUTED)
        ws.merge_cells(f"B{p+1+i}:C{p+1+i}")
        c = put(ws, f"D{p+1+i}", v, 10, bold=True)
        ws.merge_cells(f"D{p+1+i}:F{p+1+i}")
        if not str(v).startswith("="):
            c.fill = INPUT_FILL
    n = p + len(details) + 2
    notes = [
        "Please use the invoice number as your payment reference and email the remittance advice to hello@datawazi.com.",
        "Payment is due by the due date above, in line with the agreed statement of work.",
        "Software, cloud and AI service costs are billed or paid as set out in the statement of work.",
        "Thank you for working with datawazi.",
    ]
    put(ws, f"B{n}", "NOTES", 9, bold=True, color=MUTED)
    for i, t2 in enumerate(notes):
        c = put(ws, f"B{n+1+i}", t2, 9, color=MUTED)
        ws.merge_cells(f"B{n+1+i}:F{n+1+i}")
        c.alignment = Alignment(wrap_text=True, vertical="top")
        ws.row_dimensions[n + 1 + i].height = 26 if len(t2) > 88 else 14
    put(ws, f"B{n+6}", "datawazi  ·  Data & AI solutions  ·  Malaysia  ·  This is a computer-generated invoice.", 8, color=MUTED)
    ws.print_area = f"A1:G{n+6}"
    add_guide(wb, "invoice")
    out = ROOT / "sales/billing/Invoice_Template.xlsx"
    out.parent.mkdir(parents=True, exist_ok=True)
    wb.save(out)
    return out


def make_quotation():
    wb = Workbook()
    ws = wb.active
    ws.title = "Quotation"
    page_setup(ws)
    r = doc_header(ws, "QUOTATION", [
        ("Quotation no.", "DW-Q-{{YYYY}}-{{NNN}}", None, True),
        ("Date", None, DATE, True),
        ("Valid for (days)", 30, '0" days"', True),
        ("Valid until", '=IF(F7="","",F7+F8)', DATE, False),
        ("Proposal ref.", "{{PROPOSAL_REF}}", None, True),
    ])
    r = bill_to(ws, 12, "PREPARED FOR")
    c = put(ws, f"B{r+1}", "Project: {{PROJECT_TITLE}}", 10, bold=True)
    ws.merge_cells(f"B{r+1}:F{r+1}")
    c.fill = INPUT_FILL
    first, last = line_items(ws, r + 3)
    put(ws, f"C{first}", "{{e.g. Readiness audit (2 weeks) / Data platform build: deliverables D1–D5 per proposal}}", 10, italic=True, color=MUTED)
    t = totals(ws, first, last, last + 2, "TOTAL")

    s = t + 3
    put(ws, f"B{s}", "PAYMENT SCHEDULE", 9, bold=True, color=MUTED)
    for col, h in zip("CDEF", ["Milestone", "", "% of total", "Amount (RM)"]):
        c = put(ws, f"{col}{s+1}", h, 9, bold=True, color=PAPER, align="right" if col in "EF" else None)
        c.fill = PatternFill("solid", fgColor=INK)
    ws[f"B{s+1}"].fill = PatternFill("solid", fgColor=INK)
    sched = ["{{e.g. On signing (before kickoff)}}", "{{e.g. Design sign-off / build complete}}", "{{e.g. Go-live and handover}}"]
    for i, m in enumerate(sched):
        rr = s + 2 + i
        put(ws, f"B{rr}", i + 1, 9, color=MUTED)
        c = put(ws, f"C{rr}", m, 10, italic=True, color=MUTED)
        c.fill = INPUT_FILL
        c = put(ws, f"E{rr}", None, 10, fmt='0%', align="right")
        c.fill = INPUT_FILL
        put(ws, f"F{rr}", f'=IF(E{rr}="","",ROUND($F${t}*E{rr},2))', 10, fmt=MONEY, align="right")
        for col in "BCDEF":
            ws[f"{col}{rr}"].border = B_BOTTOM
    chk = s + 5
    put(ws, f"E{chk}", "Check", 8, color=MUTED, align="right")
    put(ws, f"F{chk}", f'=IF(SUM(E{s+2}:E{s+4})=0,"",IF(ROUND(SUM(E{s+2}:E{s+4}),4)=1,"adds up to 100% ✓","must add up to 100%"))', 8, color=MUTED, align="right")

    n = chk + 2
    put(ws, f"B{n}", "TERMS", 9, bold=True, color=MUTED)
    notes = [
        "Prices are in Ringgit Malaysia. Scope, deliverables and assumptions are as described in the proposal referenced above.",
        "Software, cloud and AI service costs are not included unless listed above.",
        "Work begins once the statement of work is signed and the first scheduled payment is received.",
        "Changes to scope are quoted separately through a signed change request.",
    ]
    for i, t2 in enumerate(notes):
        c = put(ws, f"B{n+1+i}", t2, 9, color=MUTED)
        ws.merge_cells(f"B{n+1+i}:F{n+1+i}")
        c.alignment = Alignment(wrap_text=True, vertical="top")
        ws.row_dimensions[n + 1 + i].height = 26 if len(t2) > 88 else 14
    a = n + 6
    put(ws, f"B{a}", "ACCEPTANCE  ·  for {{CLIENT_LEGAL_NAME}}", 9, bold=True, color=MUTED)
    for i, lab in enumerate(["Name", "Title", "Signature", "Date"]):
        put(ws, f"B{a+1+i}", lab, 9, color=MUTED)
        ws.merge_cells(f"B{a+1+i}:C{a+1+i}")
        for col in "DEF":
            ws[f"{col}{a+1+i}"].border = B_BOTTOM
        ws.row_dimensions[a + 1 + i].height = 22
    put(ws, f"B{a+6}", "datawazi  ·  Data & AI solutions  ·  Malaysia  ·  hello@datawazi.com", 8, color=MUTED)
    ws.print_area = f"A1:G{a+6}"
    add_guide(wb, "quotation")
    out = ROOT / "sales/billing/Quotation_Template.xlsx"
    wb.save(out)
    return out


def add_guide(wb, kind):
    g = wb.create_sheet("How to use")
    g.sheet_view.showGridLines = False
    g.column_dimensions["A"].width = 110
    lines = [
        (f"How to use this {kind} template", True),
        ("1. File → Save As a new copy for each client. Name it e.g. 2026-11-20_acme_" + ("invoice_DW-INV-2026-001" if kind == "invoice" else "quote_DW-Q-2026-001") + ".xlsx", False),
        ("2. Fill every pale-yellow cell. Replace every {{PLACEHOLDER}}. Totals, SST and dates calculate automatically.", False),
        ("3. Numbering: " + ("DW-INV-YYYY-NNN, one sequence per year, never reused (log every invoice in internal/finance/Payment_Tracker.xlsx)." if kind == "invoice" else "DW-Q-YYYY-NNN, one sequence per year. The quote number goes on the SOW and on every invoice."), False),
        ("4. Send as PDF: File → Export / Save as PDF (one page). Install Obel Mono (brand/fonts/obel-mono/ttf) first so it looks right.", False),
        ("5. Amounts come from internal/pricing/PRICING.md and the agreed proposal. Never save prices back into this template.", False),
        ("Bank details are placeholders until the business account is open: update them once here, then save over this template.", False),
    ]
    for i, (t, b) in enumerate(lines, start=1):
        put(g, f"A{i}", t, 11 if b else 10, bold=b)


def make_tracker():
    wb = Workbook()
    ws = wb.active
    ws.title = "Invoices"
    ws.sheet_view.showGridLines = False
    put(ws, "A1", "datawazi_  payment tracker", 14, bold=True)
    put(ws, "A2", "INTERNAL. One row per invoice. Fill the pale-yellow columns; grey columns calculate. Today:", 9, color=MUTED, italic=True)
    put(ws, "H2", "=TODAY()", 9, bold=True, fmt=DATE)
    heads = [("Invoice no.", 18), ("Client", 24), ("Project", 26), ("Type", 14), ("Quote / SOW", 14), ("Issue date", 12), ("Terms (days)", 9),
             ("Due date", 12), ("Amount excl. SST (RM)", 14), ("SST (RM)", 10), ("Total (RM)", 14), ("Paid date", 12), ("Paid (RM)", 14),
             ("Outstanding (RM)", 14), ("Status", 14), ("Days overdue", 9), ("Notes", 34)]
    hr = 4
    for i, (h, w) in enumerate(heads, start=1):
        col = ws.cell(row=hr, column=i)
        col.value = h
        col.font = f(9, True, PAPER)
        col.fill = PatternFill("solid", fgColor=INK)
        col.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[col.column_letter].width = w
    ws.row_dimensions[hr].height = 30
    inputs = set("ABCDEFGIJLMQ")
    N = 300
    for r in range(hr + 1, hr + 1 + N):
        for i in range(1, len(heads) + 1):
            c = ws.cell(row=r, column=i)
            c.font = f(9)
            c.border = B_BOTTOM
            if c.column_letter in inputs:
                c.fill = INPUT_FILL
        ws[f"F{r}"].number_format = DATE
        ws[f"L{r}"].number_format = DATE
        ws[f"G{r}"].value = None
        for col in "IJKMN":
            ws[f"{col}{r}"].number_format = MONEY
        ws[f"H{r}"] = f'=IF(F{r}="","",F{r}+IF(G{r}="",14,G{r}))'
        ws[f"H{r}"].number_format = DATE
        ws[f"K{r}"] = f'=IF(I{r}="","",I{r}+N(J{r}))'
        ws[f"N{r}"] = f'=IF(K{r}="","",K{r}-N(M{r}))'
        ws[f"O{r}"] = (f'=IF(A{r}="","",IF(N{r}<=0,"Paid",IF(N(M{r})>0,"Part-paid",'
                       f'IF(H{r}="","Draft",IF($H$2>H{r},"Overdue","Due")))))')
        ws[f"P{r}"] = f'=IF(O{r}="Overdue",$H$2-H{r},"")'
    last = hr + N
    ws.freeze_panes = f"C{hr+1}"
    ws.auto_filter.ref = f"A{hr}:Q{last}"
    dv = DataValidation(type="list", formula1='"Audit,Deposit,Milestone,Final,Retainer,Workshop,Change request,Pass-through,Other"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f"D{hr+1}:D{last}")
    red = PatternFill("solid", fgColor="FFD9D6")
    green = PatternFill("solid", fgColor="E3F9B5")
    ws.conditional_formatting.add(f"O{hr+1}:O{last}", FormulaRule(formula=[f'O{hr+1}="Overdue"'], fill=red, font=Font(name=FONT, bold=True, color="9B1C1C")))
    ws.conditional_formatting.add(f"O{hr+1}:O{last}", FormulaRule(formula=[f'O{hr+1}="Paid"'], fill=green))

    sm = wb.create_sheet("Summary")
    sm.sheet_view.showGridLines = False
    put(sm, "A1", "datawazi_  money summary", 14, bold=True)
    put(sm, "A2", "INTERNAL. Calculated from the Invoices sheet.", 9, color=MUTED, italic=True)
    rng = lambda c: f"Invoices!{c}{hr+1}:{c}{last}"
    rows = [
        ("Total invoiced (incl. SST)", f"=SUM({rng('K')})"),
        ("Total received", f"=SUM({rng('M')})"),
        ("Outstanding", f"=SUM({rng('N')})"),
        ("Overdue", f'=SUMIFS({rng("N")},{rng("O")},"Overdue")'),
        ("Due in the next 14 days", f'=SUMIFS({rng("N")},{rng("O")},"Due",{rng("H")},"<="&TODAY()+14)'),
        ("Invoices overdue (count)", f'=COUNTIF({rng("O")},"Overdue")'),
        ("Invoiced this calendar year", f'=SUMIFS({rng("K")},{rng("F")},">="&DATE(YEAR(TODAY()),1,1))'),
        ("Received this calendar year", f'=SUMIFS({rng("M")},{rng("L")},">="&DATE(YEAR(TODAY()),1,1))'),
    ]
    sm.column_dimensions["A"].width = 34
    sm.column_dimensions["B"].width = 18
    for i, (k, v) in enumerate(rows, start=4):
        put(sm, f"A{i}", k, 10)
        c = put(sm, f"B{i}", v, 11, bold=True, fmt='0' if "count" in k else '"RM "#,##0.00', align="right")
        c.border = B_BOTTOM
    sm[f"B7"].font = f(11, True, "9B1C1C")
    put(sm, "A14", "By client", 11, bold=True)
    put(sm, "A15", "Type a client name in column A (exactly as on the Invoices sheet) to see their totals.", 9, color=MUTED, italic=True)
    for col, h in zip("ABCD", ["Client", "Invoiced (RM)", "Received (RM)", "Outstanding (RM)"]):
        c = put(sm, f"{col}16", h, 9, bold=True, color=PAPER)
        c.fill = PatternFill("solid", fgColor=INK)
    sm.column_dimensions["C"].width = 18
    sm.column_dimensions["D"].width = 18
    for r in range(17, 37):
        sm[f"A{r}"].fill = INPUT_FILL
        sm[f"A{r}"].font = f(10)
        for col, src in zip("BCD", "KMN"):
            sm[f"{col}{r}"] = f'=IF(A{r}="","",SUMIFS({rng(src)},{rng("B")},A{r}))'
            sm[f"{col}{r}"].number_format = MONEY
            sm[f"{col}{r}"].font = f(10)
    g = wb.create_sheet("How to use")
    g.column_dimensions["A"].width = 110
    g.sheet_view.showGridLines = False
    tips = [
        ("How to use the payment tracker", True),
        ("Add a row the moment you send an invoice (same number as the invoice). Never delete rows: mark cancelled invoices in Notes and set the amount to 0.", False),
        ("When money arrives: fill Paid date and Paid (RM). Status changes to Paid / Part-paid automatically.", False),
        ("Status: Draft (no issue date) · Due · Overdue (past due date, red) · Part-paid · Paid.", False),
        ("Chasing: day 1 overdue → friendly reminder (email 12). Day 7 → second reminder (email 13). Day 14 → call the sponsor; pause work if the SOW allows.", False),
        ("Filter the Status column to Overdue every Monday.", False),
    ]
    for i, (t, b) in enumerate(tips, start=1):
        put(g, f"A{i}", t, 11 if b else 10, bold=b)
    out = ROOT / "internal/finance/Payment_Tracker.xlsx"
    out.parent.mkdir(parents=True, exist_ok=True)
    wb.save(out)
    return out


if __name__ == "__main__":
    for fn in (make_invoice, make_quotation, make_tracker):
        print("wrote", fn().relative_to(ROOT))
