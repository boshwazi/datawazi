# Solution design: {{PROJECT_TITLE}}

**Client:** {{CLIENT_NAME}}  ·  **Version:** {{VERSION}}  ·  **Date:** {{DATE}}  ·  **Status:** Draft / For sign-off / Approved

> 🛈 Write it so a non-technical sponsor can approve sections 1–3, and an IT person can maintain the system from sections 4–9. Diagrams beat paragraphs.

## 1. Summary
{{What we're building, for whom, and the outcome. 3–5 lines.}}

## 2. Requirements

| ID | Requirement | Priority (Must / Should / Could) | Source |
|---|---|---|---|
| R1 | {{e.g. Monthly sales by branch, refreshed daily by 7am}} | Must | Intake Q3, kickoff |

**Non-functional:** users {{N}}, data freshness {{daily}}, availability {{business hours}}, data volume {{GB}}, security {{role-based}}, PDPA {{see checklist}}.

## 3. What users will see
{{Wireframes or screenshots per screen, dashboard page or workflow. For each one: who uses it, what decision it supports, and the key measures.}}

## 4. Architecture

```
{{SOURCES}} → {{INGESTION}} → {{STORAGE: raw → clean → modelled}} → {{SERVING: dashboards / apps / AI}}
```

| Layer | Choice | Why (vs alternatives) |
|---|---|---|
| Ingestion | {{e.g. Azure Data Factory / Airbyte / Python}} | {{}} |
| Storage | {{e.g. Azure SQL / Fabric Lakehouse / BigQuery / Postgres}} | {{}} |
| Transformation | {{e.g. dbt / SQL views}} | {{}} |
| Serving | {{e.g. Power BI / Looker Studio / custom app}} | {{}} |
| AI (if any) | {{model / provider, retrieval approach}} | {{}} |
| Orchestration & monitoring | {{}} | {{}} |

## 5. Data model
{{Key entities, grain of each fact table, main dimensions. Diagram.}}

## 6. Data sources and integration

| Source | Method | Frequency | Volume | Owner | Notes |
|---|---|---|---|---|---|
| {{}} | {{API / DB / file}} | {{}} | {{}} | {{}} | {{}} |

## 7. Business rules and definitions
| Term / measure | Definition | Agreed by |
|---|---|---|
| {{e.g. Net revenue}} | {{Gross sales − returns − discounts, excl. SST}} | {{Finance}} |

## 8. Security, access and PDPA
Roles and what each can see · personal data handling (from the PDPA checklist) · environments (dev / prod).

## 9. Operations
Monitoring and alerts · what happens when a load fails · backup and recovery · cost estimate for running ({{monthly cloud / licence cost}}) · who supports it after hypercare.

## 10. Risks and decisions

| ID | Decision / risk | Option chosen | Reason | Date |
|---|---|---|---|---|

## 11. Sign-off
| Role | Name | Signature | Date |
|---|---|---|---|
| Sponsor | | | |
| IT / system owner | | | |
| datawazi lead | | | |
