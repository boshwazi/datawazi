# First read scorecard 🔒

> 🛈 Internal. Matches the "Our first read" dropdowns in `intake/Client_Intake_Quick.xlsx`. Decide within 2 working days of the fit-check call.

## 1. Score the five dimensions

| Dimension | Options | How to judge |
|---|---|---|
| **Overall complexity** | Low · Medium · High | **Low**: 1–2 sources, one output (e.g. a dashboard). **Medium**: 3–5 sources, a few outputs, light integration. **High**: many systems, real-time, custom platform or AI on sensitive data |
| **Data readiness** | Ready · Some work needed · Major cleanup needed · Unknown | Q9–13. "Unknown" usually means **recommend the audit** |
| **Budget fit** | Realistic · Tight · Unrealistic · Unknown | Compare Q18/Q19 with the internal ranges in `internal/pricing/PRICING.md` |
| **Fit with what we do** | Strong · Partial · Weak | Strong = one of the 6 builds or 3 services. Weak = marketing/social, IT hardware, staff augmentation only |
| **Next step** | Proceed to discovery · Need more info · Pass | Use the decision rules below |

## 2. Decision rules

| If… | Then |
|---|---|
| Fit **Weak** | **Pass**: refer out (email 4) |
| No sponsor or budget owner identified (Q4) | **Need more info**: one more short call with the sponsor |
| Budget **Unrealistic** and the client won't change scope | **Pass** or offer a smaller first step (e.g. a training workshop) |
| Complexity **Low**, data **Ready**, request clear | **Skip to proposal** (step 4) |
| Data **Unknown / Major cleanup**, or complexity **High** | **Proceed to discovery**: paid readiness audit |
| Anything else with Fit Strong/Partial | **Proceed to discovery** |

## 3. Red flags (note them in "Key concerns")
- "We need it in 2 weeks" for a High complexity job.
- No one internal will own the system after go-live (Q17) and no appetite for a retainer.
- Personal or health data with no idea where it's stored, or a requirement to send it overseas.
- Expectations of AI that "replaces the team" or decides on its own about people.
- Several vendors already failed on the same problem, and nobody can say why.
- Procurement requires a tender we can't realistically win. Check eligibility first, for example registration requirements for public sector or GLC work.

## 4. Record
Write a one-line summary in the intake file:
> `{{DATE}}: {{GO / NEED INFO / PASS}}. {{One sentence why}}. Next: {{action}} by {{date}} ({{owner}}).`
