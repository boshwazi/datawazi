# Billing playbook 🔒

> INTERNAL. How and when datawazi gets paid. Amounts come from `internal/pricing/PRICING.md`; this file covers the rules. Never paste payment rules into public material.

## When money moves

| Engagement | Schedule | Invoice when |
|---|---|---|
| **Readiness audit** (1–2 weeks) | **100% upfront**, or 50% to book + 50% at readout | Before the audit starts |
| **Training workshop** | **100% upfront** | When the date is confirmed |
| **Build, smaller** (≈ under RM20k or ≤ 6 weeks) | **50 / 50** | 50% on SOW signature · 50% on go-live (UAT signed) |
| **Build, larger** | **40 / 40 / 20** | 40% on signature · 40% on design sign-off or build complete · 20% on go-live |
| **Change request** | 100% on CR signature (small) or added to the next milestone | When the CR is signed |
| **Support retainer** | **Monthly in advance**, minimum 3 months | 1st of each month |
| **Third-party costs** (cloud, licences, AI usage) | Client pays the vendor directly in their own account. Otherwise passed through at cost, monthly in arrears, with the vendor invoice attached | Monthly |

## Rules
1. **No work before the first payment clears.** Kickoff is booked for after the deposit lands, not on signature.
2. **Payment terms: 14 days** from invoice date (the invoice template default). GLC and government: accept their terms (typically 30–60 days) but **require a purchase order (PO) before any work**.
3. **GLCs and government often refuse deposits.** Replace the deposit with smaller, more frequent milestones (e.g. 30 / 30 / 30 / 10) and put the PO number on every invoice.
4. **Hypercare is included** in the project price. It is never invoiced separately.
5. **Late payment:** reminder on day 1 overdue (email 12), second reminder on day 7 (email 13), a call to the sponsor on day 14. The MSA allows pausing work after written notice for undisputed overdue invoices.
6. **Every invoice** gets a row in `Payment_Tracker.xlsx` the moment it's sent. Review overdue invoices every Monday.
7. **Numbering:** quotations `DW-Q-YYYY-NNN`, invoices `DW-INV-YYYY-NNN`. One sequence per year, never reused, never deleted (cancel with a note instead).
8. **Tax:** no SST on invoices until datawazi is SST-registered. E-invoicing applies only above LHDN's turnover threshold. Confirm both with the accountant at registration and annually.

## The document trail for one project

```
Proposal & SOW SOW-… (price + schedule + terms, signed; + MSA the first time, + NDA/DPA if needed)
   ─► Invoice 1 (deposit, same day) ─► paid ─► kickoff
   ─► Invoice 2 (milestone) ─► paid
   ─► Invoice 3 (final, on go-live) ─► paid ─► hypercare ─► retainer invoices (monthly)
```

The SOW number goes on every invoice. The PO number (if any) goes on every invoice. A separate quotation (`DW-Q-…`) is issued **only when the client's procurement asks for one** (common with GLCs before a PO); it must match the Proposal & SOW.

## Files
| File | What |
|---|---|
| `sales/proposals/proposal-and-sow-template.md` | **The** client document: proposal + SOW + price + signature |
| `sales/billing/Quotation_Template.xlsx` | Formal quotation, only if the client's procurement asks for one |
| `sales/billing/Invoice_Template.xlsx` | Client invoice: totals, SST and due date calculate |
| `internal/finance/Payment_Tracker.xlsx` | Every invoice: due, paid, overdue, per-client totals |
| `internal/finance/Client_Workflow.pdf` | One-page workflow with payment points |
| `sales/emails/email-templates.md` | Emails 11–13: sending an invoice, reminders |

Bank details on the invoice are placeholders until the business account is open.
