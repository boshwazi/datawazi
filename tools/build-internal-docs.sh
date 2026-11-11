#!/usr/bin/env bash
# Export INTERNAL Markdown documents (policies, contract drafts, billing, pricing) to Word + PDF
# in internal/exports/. Internal notes are kept. These files are NEVER sent to clients
# (except contract drafts, after legal review).
# Usage: tools/build-internal-docs.sh
set -euo pipefail
cd "$(dirname "$0")/.."
REF=brand/templates/reference.docx
OUT=internal/exports
mkdir -p "$OUT/pdf"
if [ "$(uname)" = "Linux" ] && ! fc-list 2>/dev/null | grep -q "Obel Mono"; then
  mkdir -p ~/.fonts && cp brand/fonts/obel-mono/ttf/*.ttf ~/.fonts/ && fc-cache -f >/dev/null
fi
for md in internal/policies/*.md internal/contracts/*-template.md internal/finance/BILLING.md internal/pricing/PRICING.md; do
  name=$(basename "${md%.md}")
  pandoc -f gfm+hard_line_breaks -t docx --reference-doc="$REF" -o "$OUT/$name.docx" "$md"
  command -v soffice >/dev/null && soffice --headless --convert-to pdf "$OUT/$name.docx" --outdir "$OUT/pdf" >/dev/null 2>&1
  echo "wrote $OUT/$name.docx"
done
