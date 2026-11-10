# Handover pack: {{PROJECT_TITLE}}

**Client:** {{CLIENT_NAME}}  ·  **Go-live:** {{DATE}}  ·  **Handed over to:** {{CLIENT_OWNER}}

> 🛈 Our principle is "built to hand over". After reading this pack, someone at the client should be able to run, fix and extend the system without us. Store it where the client keeps documentation, not only in our files.

## 1. What was delivered
| # | Deliverable | Where it lives | Link |
|---|---|---|---|
| D1 | {{}} | {{e.g. Azure resource group `rg-dw-prod`}} | {{}} |

## 2. How it works (one page)
{{Architecture diagram + 5 bullets: sources → pipelines → storage → outputs, and the schedule}}

## 3. Run guide
| Task | How often | How | Who |
|---|---|---|---|
| Check overnight loads succeeded | Daily | {{alert email / monitor page}} | {{}} |
| Add a new user | As needed | {{steps}} | {{}} |
| Add a new branch / product / cost centre | As needed | {{steps}} | {{}} |
| Month-end / year-end steps | Monthly | {{steps}} | {{}} |
| Renew credentials / keys | {{e.g. every 90 days}} | {{steps}} | {{}} |

## 4. When something breaks
| Symptom | Likely cause | Fix |
|---|---|---|
| Dashboard shows yesterday's data | Load failed overnight | {{steps}} |
| Numbers don't match source | {{}} | {{}} |
| {{}} | | |

**Escalation:** {{CLIENT_IT}} → {{datawazi support (if retainer): channel, hours, response time}}

## 5. Business definitions
See solution design, section 7, or the data dictionary at {{LINK}}.

## 6. Access and ownership
- System owner: {{NAME}}
- Admin accounts: {{list of roles. Never write passwords here}}
- Licences / subscriptions and renewal dates: {{}}
- Monthly running cost estimate: {{}}

## 7. Training delivered
| Session | Audience | Date | Recording / slides |
|---|---|---|---|
| {{End-user training}} | {{}} | {{}} | {{}} |
| {{Admin / technical training}} | {{}} | {{}} | {{}} |

## 8. Known limitations and next ideas
- {{}}

## 9. Handover acceptance
| Client owner | datawazi lead |
|---|---|
| Name / signature / date: | Name / signature / date: |
