# UAT plan and sign-off: {{PROJECT_TITLE}}

**UAT window:** {{START}} – {{END}}  ·  **Testers:** {{NAMES}}  ·  **Log:** `UAT_Reconciliation_Log.xlsx`

> 🛈 The rule: **every number on every screen ties back to a source system** (or the difference is explained and accepted). Testers are the client's people, not us.

## 1. What's being tested
| Area | In UAT? |
|---|---|
| {{Dashboard pages / reports}} | ☐ |
| {{Data pipelines: completeness and freshness}} | ☐ |
| {{Automations / workflows}} | ☐ |
| {{Custom tool screens}} | ☐ |
| {{AI assistant answers}} | ☐ |
| Access and security by role | ☐ |

## 2. How to test
1. Open the test case in the log (tab **Test cases**).
2. Follow the steps and record **Pass / Fail / Blocked** with a comment or screenshot.
3. For numbers, fill in the **Reconciliation** tab: report value, source value, difference, explanation.
4. Anything that fails goes on the **Defects** tab with a severity.

## 3. Reconciliation rules
- Period(s) to reconcile: {{e.g. last 3 closed months}}
- Tolerance: {{e.g. exact for counts; ± RM1 for totals, from rounding}}
- Source of truth for each measure: {{e.g. revenue = ERP GL; headcount = HR system}}

## 4. AI features (if any)
- Test set: {{N}} real questions from users, with expected answers and sources
- Pass rule: {{e.g. ≥ 90% correct and cited; 0 answers leaking restricted data}}
- Out-of-scope questions must be declined politely

## 5. Defect severity
| Severity | Meaning | Must fix before go-live? |
|---|---|---|
| Critical | Wrong numbers, data leak, system unusable | Yes |
| High | Key feature broken, with a workaround | Yes, unless the sponsor accepts it |
| Medium | Minor feature issue | Agreed case by case |
| Low | Cosmetic | No, fixed in hypercare |

## 6. Exit criteria
- [ ] All test cases run
- [ ] No open Critical or High defects
- [ ] All in-scope numbers reconciled within tolerance
- [ ] Remaining defects listed with an agreed fix date

## 7. Sign-off
UAT is complete and the deliverables listed above meet the acceptance criteria in SOW {{SOW_NUMBER}}, subject to the open items below.

**Open items accepted for hypercare:** {{list or "none"}}

| Role | Name | Signature | Date |
|---|---|---|---|
| Sponsor | | | |
| Business owner / lead tester | | | |
| Datawazi lead | | | |
