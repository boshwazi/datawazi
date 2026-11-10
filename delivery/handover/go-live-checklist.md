# Go-live checklist 🔒

**Project:** {{PROJECT_TITLE}}  ·  **Go-live date:** {{DATE}}  ·  **Go / no-go call:** {{DATE, TIME}}

> 🛈 Internal run sheet. Go live early in the week, never on a Friday or before a public holiday. Check the Malaysian holiday calendar and the client's month-end.

## T-5 days
- [ ] UAT signed off; open items have agreed fix dates
- [ ] Production environment built from the same code as test
- [ ] Production credentials in the client's key vault / password manager
- [ ] Monitoring and failure alerts go to the client's and our addresses
- [ ] Backups and restore tested
- [ ] Users and roles set up in production
- [ ] Training sessions booked
- [ ] Communication to users drafted (client sends it)

## Go / no-go (T-1)
| Check | Status |
|---|---|
| No Critical/High defects open | ☐ |
| Sponsor available on go-live day | ☐ |
| Rollback plan agreed | ☐ |
| Not month-end / public holiday | ☐ |
| **Decision** | ☐ Go ☐ No-go |

## Go-live day
- [ ] Run the first production load and check row counts against source
- [ ] Spot-check 5 key numbers against source
- [ ] Switch users over and send the announcement
- [ ] Old process/report is kept in parallel for {{N}} cycles (if agreed)
- [ ] Post "live" in the project channel

## T+1 to T+5
- [ ] Daily check of loads and alerts
- [ ] Usage check: are people logging in?
- [ ] Start the hypercare log
- [ ] Handover pack delivered

## Rollback plan
{{How to switch back to the old process, and who decides}}
