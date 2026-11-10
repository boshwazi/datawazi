#!/usr/bin/env bash
# Export client-facing Markdown templates to branded Word files in exports/.
# Internal notes ("> 🛈 ..." lines) are removed from the exported copies.
# Usage:  tools/build-docs.sh            (all client-facing templates)
#         tools/build-docs.sh path/to/file.md [...]
set -euo pipefail
cd "$(dirname "$0")/.."

REF=brand/templates/reference.docx
[ -f "$REF" ] || python3 tools/make_reference_docx.py

CLIENT_FACING=(
  sales/proposals/proposal-template.md
  delivery/sow/sow-template.md
  delivery/sow/change-request-template.md
  delivery/discovery/readiness-audit-plan.md
  delivery/discovery/audit-report-template.md
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
)
FILES=("${@:-${CLIENT_FACING[@]}}")

mkdir -p exports
for md in "${FILES[@]}"; do
  case "$md" in internal/*) echo "skip (internal): $md"; continue;; esac
  out="exports/$(basename "${md%.md}").docx"
  grep -v '^> 🛈' "$md" | pandoc -f gfm+hard_line_breaks -t docx --reference-doc="$REF" -o "$out"
  echo "wrote $out"
done
