#!/usr/bin/env bash
# Build the "datawazi assets" pack: every finished template, deck, spreadsheet and document,
# sorted by purpose, as ready-to-open files (PDF / Word / Excel / PowerPoint) + a ZIP.
# Usage (repo root):  tools/make_assets_pack.sh [output-dir]      default: ./datawazi-assets-pack (git-ignored)
# Rebuild exports first so the pack is current:  tools/build-docs.sh && tools/build-internal-docs.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUTDIR="${1:-datawazi-assets-pack}"
P="$OUTDIR/datawazi-assets"
TMP="$OUTDIR/.md2pdf"
REF=brand/templates/reference.docx
rm -rf "$OUTDIR"; mkdir -p "$P" "$TMP"

# Markdown docs that aren't part of the client-facing export set
conv() { pandoc -f gfm+hard_line_breaks -t docx --reference-doc="$REF" -o "$TMP/$2.docx" "$1" && soffice --headless --convert-to pdf --outdir "$TMP" "$TMP/$2.docx" >/dev/null 2>&1; }
conv brand/BRAND.md Brand_Guide
conv sales/emails/email-templates.md Email_Templates
conv delivery/intake/fit-check-call-guide.md Fit_Check_Call_Guide
conv delivery/fit-check/first-read-scorecard.md First_Read_Scorecard
conv delivery/handover/go-live-checklist.md Go_Live_Checklist
conv delivery/run/project-close-review.md Project_Close_Review
conv brand/social/linkedin.md LinkedIn_Page_Copy
node tools/html_to_pdf.js delivery/playbook.html "$TMP/Playbook.pdf" >/dev/null

E=exports; X=exports/pdf; I=internal/exports
mk() { mkdir -p "$P/$1"; }
cp2() { cp "$1" "$P/$2"; }
both() { cp2 "$E/$1.docx" "$2/$3.docx"; cp2 "$X/$1.pdf" "$2/$3.pdf"; }

# 1 Brand
B="1 Brand"; mk "$B/Logos"; mk "$B/Square logos (social)"; mk "$B/Fonts - Obel Mono (install these)"; mk "$B/LinkedIn"; mk "$B/Email signature"
cp2 brand/Datawazi_Info_Pack.pdf "$B/datawazi Info Pack (marketing & partners).pdf"
cp2 "$TMP/Brand_Guide.pdf" "$B/Brand Guide.pdf"
cp brand/logo/*.png brand/logo/*.svg "$P/$B/Logos/"
cp brand/logo/square/* "$P/$B/Square logos (social)/"
cp brand/fonts/obel-mono/ttf/*.ttf brand/fonts/obel-mono/OFL.txt "$P/$B/Fonts - Obel Mono (install these)/"
cp brand/social/*.png "$P/$B/LinkedIn/"; cp2 "$TMP/LinkedIn_Page_Copy.pdf" "$B/LinkedIn/LinkedIn page copy.pdf"
cp brand/email-signature/signature.html brand/email-signature/signature-preview.png "$P/$B/Email signature/"

# 2 Sales
S="2 Sales"; mk "$S"
cp2 sales/deck/Datawazi_Capabilities_Deck.pptx "$S/Capabilities Deck (send to clients).pptx"
cp2 sales/deck/Datawazi_Capabilities_Deck.pdf "$S/Capabilities Deck (send to clients).pdf"
cp2 sales/deck/Datawazi_Slide_Template.pptx "$S/Slide Template (blank, for new decks).pptx"
cp2 sales/deck/Datawazi_Slide_Template.pdf "$S/Slide Template (preview).pdf"
cp2 $E/security-overview.docx "$S/Security & Data Protection Overview.docx"; cp2 $X/security-overview.pdf "$S/Security & Data Protection Overview.pdf"
cp2 "$TMP/Email_Templates.pdf" "$S/Email Templates (13 emails).pdf"

# 3 Client workflow
D="3 Client workflow"; mk "$D"
cp2 "$TMP/Playbook.pdf" "$D/00 Playbook - which file at which step (start here).pdf"
st() { mk "$D/$1"; }
st "01 Fit check & intake"
cp2 delivery/intake/Client_Intake_Client.xlsx "$D/01 Fit check & intake/Client Intake Workbook (send to client).xlsx"
cp2 delivery/intake/Client_Intake_Quick.xlsx "$D/01 Fit check & intake/Client Intake + scoring (INTERNAL).xlsx"
cp2 "$TMP/Fit_Check_Call_Guide.pdf" "$D/01 Fit check & intake/Fit Check Call Guide (INTERNAL).pdf"
cp2 "$TMP/First_Read_Scorecard.pdf" "$D/01 Fit check & intake/First Read Scorecard (INTERNAL).pdf"
st "02 Discovery & audit (optional)"
both readiness-audit-plan "$D/02 Discovery & audit (optional)" "Readiness Audit Plan"
both audit-report-template "$D/02 Discovery & audit (optional)" "Audit Report Template"
cp2 delivery/discovery/Data_Source_Inventory.xlsx "$D/02 Discovery & audit (optional)/Data Source Inventory.xlsx"
F3="03 Proposal & SOW"; st "$F3"
both proposal-and-sow-template "$D/$F3" "1 Proposal & SOW Template (send, client signs)"
cp2 sales/billing/Invoice_Template.xlsx "$D/$F3/2 Invoice Template (deposit, same day).xlsx"
both change-request-template "$D/$F3" "Change Request Template (during the project)"
cp2 sales/billing/Quotation_Template.xlsx "$D/$F3/Quotation Template (only if procurement asks).xlsx"
st "04 Kickoff"; both kickoff-agenda "$D/04 Kickoff" "Kickoff Agenda"; both access-checklist "$D/04 Kickoff" "Access Checklist"; both pdpa-checklist "$D/04 Kickoff" "PDPA Checklist"
st "05 Design & build"; both solution-design-template "$D/05 Design & build" "Solution Design Template"; both weekly-update-template "$D/05 Design & build" "Weekly Update Template"
cp2 delivery/build/RAID_Log.xlsx "$D/05 Design & build/RAID Log (risks, issues, decisions).xlsx"
st "06 Test & UAT"; both uat-plan-and-signoff "$D/06 Test & UAT" "UAT Plan and Sign-off"; cp2 delivery/uat/UAT_Reconciliation_Log.xlsx "$D/06 Test & UAT/UAT & Reconciliation Log.xlsx"
st "07 Launch & handover"; both handover-pack-template "$D/07 Launch & handover" "Handover Pack Template"; both hypercare-plan "$D/07 Launch & handover" "Hypercare Plan"
cp2 "$TMP/Go_Live_Checklist.pdf" "$D/07 Launch & handover/Go-Live Checklist (INTERNAL).pdf"
st "08 Run & grow"; both monthly-support-report "$D/08 Run & grow" "Monthly Support Report"; both case-study-template "$D/08 Run & grow" "Case Study Template"
cp2 "$TMP/Project_Close_Review.pdf" "$D/08 Run & grow/Project Close Review (INTERNAL).pdf"

# 4 Internal
N="4 INTERNAL - never share"; C="$N/Contracts (DRAFTS - lawyer review needed)"; mk "$C"
cp2 internal/sales/Sales_Pipeline.xlsx "$N/Sales Pipeline.xlsx"
cp2 internal/finance/Payment_Tracker.xlsx "$N/Payment Tracker.xlsx"
cp2 internal/pricing/Quote_Calculator.xlsx "$N/Quote Calculator.xlsx"
cp2 internal/finance/Client_Workflow.pdf "$N/Client Workflow & Payment Points.pdf"
cp2 $I/pdf/BILLING.pdf "$N/Billing Rules.pdf"
cp2 $I/pdf/PRICING.pdf "$N/Rate Card (DRAFT).pdf"
cp2 $I/information-security-and-data-protection-policy.docx "$N/Information Security & Data Protection Policy.docx"
cp2 $I/pdf/information-security-and-data-protection-policy.pdf "$N/Information Security & Data Protection Policy.pdf"
for pair in "msa-template:Master Services Agreement" "nda-template:NDA" "dpa-template:Data Processing Agreement"; do
  f="${pair%%:*}"; n="${pair#*:}"
  cp2 "$I/$f.docx" "$C/$n (DRAFT).docx"; cp2 "$I/pdf/$f.pdf" "$C/$n (DRAFT).pdf"
done

cat > "$P/READ ME.txt" <<EOF
datawazi_ assets pack  ·  built $(date +"%d %b %Y")

1 Brand             Info pack, brand guide, logos, square social logos, fonts, LinkedIn kit, email signature.
                    Install the Obel Mono fonts first (select all .ttf > double-click > Install).
2 Sales             Capabilities deck (send after a fit check), blank slide template,
                    security overview (for client IT/procurement), 13 email templates.
3 Client workflow   Every template, in the order you use them. Start with "00 Playbook".
                    Documents come as .docx (edit) and .pdf (preview). Send clients PDFs.
                    Files marked (INTERNAL) are for you only.
4 INTERNAL          Sales pipeline, payment tracker, billing rules, pricing, security policy,
                    contract drafts. NEVER share (contracts only after a lawyer has reviewed them).

Templates use {{PLACEHOLDERS}}: search for "{{" and replace them all before sending.
Master copies: GitHub repo boshwazi/datawazi (main). Rebuild this pack: tools/make_assets_pack.sh
EOF
rm -rf "$TMP"
(cd "$OUTDIR" && zip -qr -X datawazi-assets.zip datawazi-assets)
echo "files: $(find "$P" -type f | wc -l) · zip: $(du -h "$OUTDIR/datawazi-assets.zip" | cut -f1) · $OUTDIR/datawazi-assets.zip"
