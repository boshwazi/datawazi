# Service one-pagers

Client-facing A4 PDFs, one per service, plus the **Data health check** offer sheet (the entry offer). Obel Mono embedded. **No prices**: every page says pricing is scoped after the fit check.

| File | Send when |
|---|---|
| `Datawazi_00_Data_Health_Check.pdf` | The prospect asks "where do we start?" (email 17) |
| `Datawazi_01…06_*.pdf` | After a fit check, matching their problem (what we build) |
| `Datawazi_07_Strategy_and_Advice.pdf` | They want advice only, or someone else will build |
| `Datawazi_08_AI_Adoption_and_Training.pdf` | Workshops, playbooks, AI usage policy |
| `Datawazi_09_Managed_Support.pdf` | After go-live, or systems someone else built |
| `Datawazi_All_Services.pdf` | Procurement or a partner wants everything in one file |

**Edit:** the copy lives in `tools/make_one_pagers.js` (headlines: line break after each comma or full stop). **Build:** `node tools/make_one_pagers.js` from the repo root. The script warns if a page overflows A4.
