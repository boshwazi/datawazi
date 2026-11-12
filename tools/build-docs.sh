#!/usr/bin/env bash
# Export client-facing Markdown templates to branded Word files in exports/.
# Internal notes ("> 🛈 ..." lines) are removed from the exported copies.
# Usage:  tools/build-docs.sh            (all client-facing templates: .docx + .pdf)
#         tools/build-docs.sh path/to/file.md [...]
# PDFs embed Obel Mono, so send clients the PDF. Needs LibreOffice and the fonts in
# brand/fonts/obel-mono/ttf/ installed (the script installs them into ~/.fonts on Linux).
set -euo pipefail
cd "$(dirname "$0")/.."

REF=brand/templates/reference.docx
[ -f "$REF" ] || python3 tools/make_reference_docx.py

CLIENT_FACING=(
  sales/proposals/proposal-and-sow-template.md
  sales/security-overview.md
  delivery/sow/change-request-template.md
  delivery/discovery/readiness-audit-plan.md
  delivery/discovery/audit-report-template.md
  delivery/kickoff/welcome-pack-template.md
  delivery/kickoff/kickoff-agenda.md
  delivery/kickoff/access-checklist.md
  delivery/kickoff/pdpa-checklist.md
  delivery/design/solution-design-template.md
  delivery/build/weekly-update-template.md
  delivery/uat/uat-plan-and-signoff.md
  delivery/handover/handover-pack-template.md
  delivery/handover/hypercare-plan.md
  delivery/run/monthly-support-report.md
  delivery/run/case-study-template.md
  delivery/training/participant-workbook.md
  delivery/training/prompt-playbook.md
  delivery/training/ai-usage-policy-template.md
)
FILES=("${@:-${CLIENT_FACING[@]}}")

mkdir -p exports exports/pdf
if [ "$(uname)" = "Linux" ] && ! fc-list 2>/dev/null | grep -q "Obel Mono"; then
  mkdir -p ~/.fonts && cp brand/fonts/obel-mono/ttf/*.ttf ~/.fonts/ && fc-cache -f >/dev/null
fi
for md in "${FILES[@]}"; do
  case "$md" in internal/*) echo "skip (internal): $md"; continue;; esac
  out="exports/$(basename "${md%.md}").docx"
  grep -v '^> 🛈' "$md" | pandoc -f gfm+hard_line_breaks -t docx --reference-doc="$REF" -o "$out"
  echo "wrote $out"
  if command -v soffice >/dev/null; then
    soffice --headless --convert-to pdf "$out" --outdir exports/pdf >/dev/null 2>&1 && echo "wrote exports/pdf/$(basename "${out%.docx}").pdf"
  fi
done
