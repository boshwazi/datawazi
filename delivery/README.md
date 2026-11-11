# Delivery playbook

Every client goes through the same 11 steps. This page tells you which template to use at each step, who sees it, and what has to be true before you move on.

**Legend:** 🟢 client-facing · 🔒 internal only

| # | Step | Templates | Done when |
|---|---|---|---|
| 1 | Client intake | 🟢 [`intake/Client_Intake_Client.xlsx`](intake/Client_Intake_Client.xlsx) (send this one) · 🔒 [`intake/Client_Intake_Quick.xlsx`](intake/Client_Intake_Quick.xlsx) (our copy, with first-read scoring) · 🔒 [`intake/fit-check-call-guide.md`](intake/fit-check-call-guide.md) · 🟢 [emails 1–2](../sales/emails/email-templates.md) | All 20 answers captured (in the call or the form) |
| 2 | First read & fit check | 🔒 [`fit-check/first-read-scorecard.md`](fit-check/first-read-scorecard.md) · 🟢 [emails 3–4](../sales/emails/email-templates.md) · 💰 route decision A/B/C (see below) | Go / no-go decided within 2 working days. No-go → referral email. Choose **A** proposal · **B** paid audit · **C** refer out |
| 3 | Discovery & audit | 🟢 [`discovery/readiness-audit-plan.md`](discovery/readiness-audit-plan.md) · 🟢 [`discovery/Data_Source_Inventory.xlsx`](discovery/Data_Source_Inventory.xlsx) · 🟢 [`discovery/audit-report-template.md`](discovery/audit-report-template.md) · 🟢 [`../sales/billing/Quotation_Template.xlsx`](../sales/billing/Quotation_Template.xlsx) · 🟢 [`../sales/billing/Invoice_Template.xlsx`](../sales/billing/Invoice_Template.xlsx) | Roadmap presented. *Small, clear requests skip to step 4*. 💰 **Audit invoiced upfront** (100%, or 50/50) |
| 4 | Proposal & contract | 🟢 [`../sales/proposals/proposal-template.md`](../sales/proposals/proposal-template.md) · 🟢 [`sow/sow-template.md`](sow/sow-template.md) · 🔒 [`../internal/contracts/`](../internal/contracts/) · 🟢 [email 5](../sales/emails/email-templates.md) · 🟢 [`../sales/billing/Quotation_Template.xlsx`](../sales/billing/Quotation_Template.xlsx) · 🟢 [`../sales/billing/Invoice_Template.xlsx`](../sales/billing/Invoice_Template.xlsx) · 🟢 [emails 11–13](../sales/emails/email-templates.md) | SOW + MSA signed, NDA/DPA in place, deposit received. 💰 **Invoice 1 (deposit) paid before kickoff**; GLC/govt: PO received |
| 5 | Kickoff & access | 🟢 [`kickoff/kickoff-agenda.md`](kickoff/kickoff-agenda.md) · 🟢 [`kickoff/access-checklist.md`](kickoff/access-checklist.md) · 🟢 [`kickoff/pdpa-checklist.md`](kickoff/pdpa-checklist.md) · 🟢 [email 6](../sales/emails/email-templates.md) | Access working, PDPA checklist complete, success metrics agreed (from intake Q3) |
| 6 | Solution design | 🟢 [`design/solution-design-template.md`](design/solution-design-template.md) | Design signed off by sponsor · 💰 40/40/20: invoice 2 at design sign-off (or at build complete) |
| 7 | Build in sprints | 🟢 [`build/weekly-update-template.md`](build/weekly-update-template.md) · 🟢 [`build/RAID_Log.xlsx`](build/RAID_Log.xlsx) · 🟢 [`sow/change-request-template.md`](sow/change-request-template.md) | All in-scope items demoed · 💰 change requests invoiced on signature or with the next milestone |
| 8 | Test & UAT | 🟢 [`uat/uat-plan-and-signoff.md`](uat/uat-plan-and-signoff.md) · 🟢 [`uat/UAT_Reconciliation_Log.xlsx`](uat/UAT_Reconciliation_Log.xlsx) · 🟢 [email 7](../sales/emails/email-templates.md) | Numbers reconcile to source; UAT signed |
| 9 | Launch & handover | 🟢 [`handover/handover-pack-template.md`](handover/handover-pack-template.md) · 🔒 [`handover/go-live-checklist.md`](handover/go-live-checklist.md) · 🟢 [email 8](../sales/emails/email-templates.md) | Live, trained, docs delivered · 💰 **final invoice** on go-live / UAT sign-off |
| 10 | Hypercare (2–4 wks) | 🟢 [`handover/hypercare-plan.md`](handover/hypercare-plan.md) · 🟢 [email 9](../sales/emails/email-templates.md) | Exit criteria met; hypercare closed in writing · hypercare is included, never invoiced |
| 11 | Run & grow | 🟢 [`run/monthly-support-report.md`](run/monthly-support-report.md) · 🔒 [`run/project-close-review.md`](run/project-close-review.md) · 🟢 [`run/case-study-template.md`](run/case-study-template.md) · 🟢 [email 10](../sales/emails/email-templates.md) | Retainer agreed or project closed; next phase → step 3 · 💰 retainer invoiced monthly in advance |

## Getting paid 🔒

**Legend:** 💰 = money moves at this step. Rules, schedules and chasing: [`../internal/finance/BILLING.md`](../internal/finance/BILLING.md) · one-page overview: [`../internal/finance/Client_Workflow.pdf`](../internal/finance/Client_Workflow.pdf) · every invoice logged in [`../internal/finance/Payment_Tracker.xlsx`](../internal/finance/Payment_Tracker.xlsx).

- **No work before the first payment clears.** Book kickoff after the deposit lands.
- Document trail: proposal → quotation (`DW-Q-…`) → SOW + MSA signed → invoices (`DW-INV-…`, quoting the SOW and any PO number).

## Conventions

- **Placeholders** are `{{UPPER_SNAKE}}`, e.g. `{{CLIENT_NAME}}`, `{{SPONSOR_NAME}}`, `{{DATE}}`. Search for `{{` before sending anything. Nothing goes out with a placeholder left in it.
- **Pricing:** templates never contain amounts, rates or payment terms. Fill `{{FEES_TABLE}}` and `{{PAYMENT_TERMS}}` per client from `internal/pricing/PRICING.md`. That client's own document can carry their quote; the template must not.
- **Instructions to us** sit in `> 🛈` blockquotes. Delete them before sending.
- **File names for client copies:** `YYYY-MM-DD_{{CLIENT_SHORT}}_{{DOC}}_v1.docx`, e.g. `2026-11-20_acme_proposal_v1.docx`.
- **Word versions:** run `tools/build-docs.sh` to turn the 🟢 Markdown templates into branded `.docx` in `exports/`.
- **Client folders:** keep live client work out of this repo. It may contain personal data (PDPA). Use the client's agreed storage.
