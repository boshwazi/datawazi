# Client onboarding checklist (internal)

> 🛈 Internal: from "Proposal & SOW signed" to "kickoff done". Copy it into the client's project notes and tick as you go. Not sent to clients. Money rules: `internal/finance/BILLING.md`.

**Client:** {{CLIENT_NAME}} · **Project:** {{PROJECT_TITLE}} · **SOW:** {{SOW_NUMBER}} · **Signed:** {{DATE}} · **Owner:** {{NAME}}

## Day 0: the day it's signed
☐ Proposal & SOW signed by both sides; PDF saved to the client folder
☐ **First project with this client:** MSA signed too (draft in `internal/contracts/`, lawyer-reviewed)
☐ Personal data in scope? **NDA + DPA signed before any access** (security policy)
☐ Deposit invoice sent **the same day** (email 11), numbered `DW-INV-YYYY-NNN`, quoting the SOW number (and PO number for GLC / government)
☐ Invoice logged in `internal/finance/Payment_Tracker.xlsx`
☐ Sales pipeline updated: stage **Won**, value, expected start (`internal/sales/Sales_Pipeline.xlsx`)
☐ Welcome email sent with the welcome pack and access checklist (email 14)

## Before kickoff (normally within 5 working days)
☐ **Deposit received** (or PO received for GLC / government). **No work before the first payment clears**
☐ Kickoff date confirmed; invite sent with agenda, access checklist and PDPA checklist (email 6)
☐ Client roles confirmed: sponsor, day-to-day contact, IT contact, data owners, testers
☐ Client folder created in the **client's** agreed storage (not this repo, not personal drives)
☐ Access requests started from `access-checklist.md`: least access, read-only where possible, named accounts, MFA on
☐ Weekly demo slot booked (same day and time every week) and the weekly update owner agreed
☐ Communication channel agreed (email, Teams, Slack or WhatsApp group for quick questions only; decisions in writing by email)
☐ RAID log started from `../build/RAID_Log.xlsx`
☐ Success measures copied from intake Q3 into the kickoff deck
☐ Project timeline from the SOW turned into a simple plan with milestones and invoice points (40/40/20 or 50/50)

## At kickoff
☐ Run `kickoff-agenda.md`
☐ PDPA checklist completed together (`pdpa-checklist.md`)
☐ Success measures agreed and written down
☐ Access status reviewed: anything not working has an owner and a date
☐ Change request process explained (`../sow/change-request-template.md`)
☐ Next 2 weeks agreed: what the first demo will show

## Within 2 days of kickoff
☐ Kickoff notes sent: decisions, actions, owners, dates
☐ First weekly update scheduled (`../build/weekly-update-template.md`)
☐ Any access still missing escalated to the sponsor
☐ Calendar reminders set for: invoice 2 (design sign-off or build complete), UAT window, go-live, hypercare end, next-phase check-in (60–90 days after go-live)
