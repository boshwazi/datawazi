# Billing documents (client-facing)

| File | Use |
|---|---|
| `Quotation_Template.xlsx` | Quote with line items, totals and a payment schedule that must add up to 100%, plus an acceptance block. Numbered `DW-Q-YYYY-NNN` |
| `Invoice_Template.xlsx` | Invoice: totals, SST (0% until registered) and due date calculate automatically. Numbered `DW-INV-YYYY-NNN` |

Each file has a **How to use** tab. Save a copy per client, fill the pale-yellow cells, and send it as a **PDF**.
Bank details are `{{PLACEHOLDERS}}` until the business account is open: fill them once and save over the template.
Amounts come from the agreed proposal (`internal/pricing/PRICING.md`); never save prices into these templates.
Rules for when to invoice: `internal/finance/BILLING.md` (internal). Rebuild: `python3 tools/make_billing.py`.
