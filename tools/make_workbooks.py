"""Generate Datawazi working spreadsheets.

Run from the repo root:  python3 tools/make_workbooks.py
Re-running overwrites the generated files (not the source intake workbook).
"""
from pathlib import Path

from openpyxl import Workbook, load_workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
INK, PAPER, LIME, COBALT = "0A0C0F", "EEF0EA", "C8FF2E", "4D6BFF"
MONO = "Obel Mono"  # brand face; install brand/fonts/obel-mono/ttf/ to see it in Excel
BODY = "Obel Mono"
thin = Side(style="thin", color="C9CCC4")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)


def brand_header(ws, title, subtitle, ncols):
    ws["A1"] = "datawazi_"
    ws["A1"].font = Font(name=MONO, bold=True, size=14, color=INK)
    ws["A2"] = title
    ws["A2"].font = Font(name=MONO, bold=True, size=16, color=INK)
    ws["A3"] = subtitle
    ws["A3"].font = Font(name=BODY, italic=True, size=9, color="555A54")
    for c in range(1, ncols + 1):
        ws.cell(row=4, column=c).fill = PatternFill("solid", fgColor=LIME)
    ws.row_dimensions[4].height = 4


def table(ws, start_row, headers, widths, rows=40, examples=()):
    for i, (h, w) in enumerate(zip(headers, widths), start=1):
        cell = ws.cell(row=start_row, column=i, value=h)
        cell.font = Font(name=MONO, bold=True, color=PAPER, size=10)
        cell.fill = PatternFill("solid", fgColor=INK)
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = BORDER
        ws.column_dimensions[cell.column_letter].width = w
    ws.row_dimensions[start_row].height = 30
    for r in range(start_row + 1, start_row + 1 + rows):
        for c in range(1, len(headers) + 1):
            cell = ws.cell(row=r, column=c)
            cell.font = Font(name=BODY, size=10)
            cell.alignment = Alignment(wrap_text=True, vertical="top")
            cell.border = BORDER
    for offset, ex in enumerate(examples, start=1):
        for c, v in enumerate(ex, start=1):
            cell = ws.cell(row=start_row + offset, column=c, value=v)
            cell.font = Font(name=BODY, size=10, italic=True, color="7A7F78")
    ws.freeze_panes = ws.cell(row=start_row + 1, column=1)
    ws.auto_filter.ref = f"A{start_row}:{ws.cell(row=start_row, column=len(headers)).column_letter}{start_row + rows}"


def dropdown(ws, col_letter, first, last, options):
    dv = DataValidation(type="list", formula1='"' + ",".join(options) + '"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f"{col_letter}{first}:{col_letter}{last}")


def client_intake():
    src = ROOT / "delivery/intake/Client_Intake_Quick.xlsx"
    wb = load_workbook(src)
    ws = wb.active
    # Remove the internal "Our first read" section (row 35 spacer through row 42)
    # and its dropdown validations.
    ws.data_validations.dataValidation = []
    for rng in list(ws.merged_cells.ranges):
        if rng.min_row >= 35:
            ws.unmerge_cells(str(rng))
    ws.delete_rows(35, ws.max_row - 34)
    last = ws.max_row + 2
    ws.cell(row=last, column=1, value="Thank you. Please return this to us before our call, or we'll go through it together.")
    ws.cell(row=last, column=1).font = Font(name=BODY, italic=True, size=9, color="555A54")
    out = ROOT / "delivery/intake/Client_Intake_Client.xlsx"
    wb.save(out)
    return out


def data_inventory():
    wb = Workbook()
    ws = wb.active
    ws.title = "Inventory"
    headers = ["#", "System / source", "Business area", "What data (main tables / files)", "Owner",
               "Type", "Hosted where", "Access method", "Volume (approx.)", "History (years)",
               "Refresh needed", "Quality (1-5)", "Personal data?", "Sensitive?", "Notes / known issues"]
    widths = [4, 22, 16, 32, 16, 14, 16, 16, 14, 10, 14, 10, 12, 10, 34]
    brand_header(ws, "Data Source Inventory", "Client: {{CLIENT_NAME}} · Completed by: {{NAME}} · Date: {{DATE}}. Grey rows are examples; overwrite them.", len(headers))
    table(ws, 6, headers, widths, rows=40, examples=[
        (1, "ERP (e.g. SQL Account / SAP B1)", "Finance", "GL, invoices, sales orders", "Finance Mgr", "Database", "On-premises", "Read-only DB login", "5 GB", 6, "Daily", 4, "Yes", "No", "Branch codes changed in 2022"),
        (2, "Sales tracker.xlsx", "Sales", "Monthly targets by rep", "Sales Ops", "Spreadsheet", "SharePoint", "File share", "2 MB", 3, "Monthly", 2, "Yes", "No", "Manual, several versions"),
    ])
    dropdown(ws, "F", 7, 46, ["Database", "SaaS app", "Spreadsheet", "Files / PDFs", "API", "Other"])
    dropdown(ws, "G", 7, 46, ["On-premises", "Cloud", "SaaS", "SharePoint / Drive", "Laptops", "Unknown"])
    dropdown(ws, "K", 7, 46, ["Real-time", "Hourly", "Daily", "Weekly", "Monthly", "Ad hoc"])
    dropdown(ws, "L", 7, 46, ["1", "2", "3", "4", "5"])
    dropdown(ws, "M", 7, 46, ["Yes", "No", "Unsure"])
    dropdown(ws, "N", 7, 46, ["Yes", "No", "Unsure"])
    g = wb.create_sheet("Guide")
    for i, line in enumerate([
        "How to fill this in",
        "One row per system, database, app or important spreadsheet.",
        "Quality: 1 = can't trust it, 3 = usable with checking, 5 = clean and reliable.",
        "Personal data: anything that identifies a person (name, IC, phone, email, staff/patient/student ID).",
        "Sensitive: health, religion, political opinion, offences, biometrics (PDPA).",
        "Don't put passwords or real records in this file.",
    ], start=1):
        g.cell(row=i, column=1, value=line).font = Font(name=MONO if i == 1 else BODY, bold=i == 1, size=11 if i == 1 else 10)
    g.column_dimensions["A"].width = 100
    out = ROOT / "delivery/discovery/Data_Source_Inventory.xlsx"
    wb.save(out)
    return out


def raid_log():
    wb = Workbook()
    ws = wb.active
    ws.title = "RAID"
    headers = ["ID", "Type", "Title", "Description", "Impact", "Likelihood", "Owner", "Raised", "Due", "Status", "Action / decision"]
    widths = [6, 12, 26, 40, 10, 11, 16, 12, 12, 12, 40]
    brand_header(ws, "RAID Log", "Project: {{PROJECT_TITLE}} · Risks, Assumptions, Issues, Decisions (and Dependencies). Review weekly at the demo.", len(headers))
    table(ws, 6, headers, widths, rows=60, examples=[
        ("R-01", "Risk", "VPN access delayed", "IT needs 2 weeks to approve VPN accounts", "High", "Medium", "Client IT", "2026-11-20", "2026-11-27", "Open", "Escalated to sponsor; use file extracts meanwhile"),
        ("D-01", "Decision", "Net revenue definition", "Net revenue = gross − returns − discounts, excl. SST", "Medium", "", "Finance Mgr", "2026-11-22", "", "Closed", "Agreed in demo 2"),
    ])
    dropdown(ws, "B", 7, 66, ["Risk", "Assumption", "Issue", "Decision", "Dependency"])
    dropdown(ws, "E", 7, 66, ["High", "Medium", "Low"])
    dropdown(ws, "F", 7, 66, ["High", "Medium", "Low"])
    dropdown(ws, "J", 7, 66, ["Open", "In progress", "Closed"])
    out = ROOT / "delivery/build/RAID_Log.xlsx"
    wb.save(out)
    return out


def uat_log():
    wb = Workbook()
    ws = wb.active
    ws.title = "Test cases"
    headers = ["TC", "Area", "Scenario", "Steps", "Expected result", "Tester", "Date", "Result", "Comment / evidence", "Defect ID"]
    widths = [7, 16, 28, 36, 30, 14, 12, 10, 30, 10]
    brand_header(ws, "UAT & Reconciliation Log", "Project: {{PROJECT_TITLE}} · UAT window {{START}} – {{END}}", len(headers))
    table(ws, 6, headers, widths, rows=60, examples=[
        ("TC-01", "Sales dashboard", "Branch manager sees only own branch", "Log in as test BM user; open Sales page", "Only branch KL01 visible", "", "", "", "", ""),
    ])
    dropdown(ws, "H", 7, 66, ["Pass", "Fail", "Blocked", "Not run"])

    rc = wb.create_sheet("Reconciliation")
    headers = ["#", "Measure", "Period", "Filter / slice", "Report value", "Source system", "Source value", "Difference", "Within tolerance?", "Explanation", "Checked by"]
    widths = [5, 22, 12, 18, 14, 18, 14, 13, 13, 34, 14]
    brand_header(rc, "Reconciliation", "Every in-scope number ties back to its source system. Tolerance: {{e.g. ± RM1}}", len(headers))
    table(rc, 6, headers, widths, rows=60, examples=[
        (1, "Net revenue", "2026-10", "All branches", 1250430.25, "ERP GL", 1250430.25, None, "Yes", "", ""),
    ])
    for r in range(7, 67):
        rc[f"H{r}"] = f'=IF(OR(E{r}="",G{r}=""),"",E{r}-G{r})'
        rc[f"E{r}"].number_format = rc[f"G{r}"].number_format = rc[f"H{r}"].number_format = "#,##0.00"
    dropdown(rc, "I", 7, 66, ["Yes", "No", "Explained"])

    df = wb.create_sheet("Defects")
    headers = ["ID", "Found in TC", "Summary", "Steps to reproduce", "Severity", "Raised by", "Raised", "Status", "Fixed in", "Retested by"]
    widths = [8, 10, 30, 36, 11, 14, 12, 12, 12, 12]
    brand_header(df, "Defects", "Severity: Critical / High must be fixed before go-live", len(headers))
    table(df, 6, headers, widths, rows=60)
    dropdown(df, "E", 7, 66, ["Critical", "High", "Medium", "Low"])
    dropdown(df, "H", 7, 66, ["Open", "Fixing", "Ready to retest", "Closed", "Deferred"])
    out = ROOT / "delivery/uat/UAT_Reconciliation_Log.xlsx"
    wb.save(out)
    return out


if __name__ == "__main__":
    for fn in (client_intake, data_inventory, raid_log, uat_log):
        print("wrote", fn().relative_to(ROOT))
