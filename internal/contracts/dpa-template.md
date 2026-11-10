# Data Processing Agreement (PDPA)

> 🛈 DRAFT. Needs legal review before use (see README). Under the PDPA 2024 amendments, data processors have direct security obligations. Make sure the lawyer checks this against the latest Commissioner guidelines.

**Dated** {{DATE}} between **{{CLIENT_LEGAL_NAME}}** ("**Client**", the data user / controller) and **{{DW_LEGAL_NAME}}** ("**datawazi**", the data processor). It supplements the Master Services Agreement dated {{MSA_DATE}}.

## 1. Scope of processing (complete per project, or attach the PDPA checklist)

| Item | Detail |
|---|---|
| Purpose | {{e.g. build and maintain reporting platform under SOW-001}} |
| Categories of data subjects | {{employees / customers / patients / students}} |
| Personal data fields | {{}} |
| Sensitive personal data | {{none / list}} |
| Processing activities | {{extract, store, transform, display, AI retrieval}} |
| Location of processing | {{cloud region / country}} |
| Duration | Term of the SOW + {{N}} days for return/deletion |

## 2. datawazi's obligations
datawazi will:
1. process personal data only on the Client's documented instructions and for the purpose above;
2. keep it confidential and allow access only to staff who need it and are bound by confidentiality;
3. apply appropriate technical and organisational security measures (section 4), as required of processors under the PDPA;
4. not engage a sub-processor without the Client's prior written approval (approved list in section 5), and bind any sub-processor to equivalent terms;
5. not transfer personal data outside Malaysia except as approved in section 1 or in writing, and in line with the PDPA's cross-border transfer provisions;
6. help the Client respond to data subjects' access and correction requests;
7. notify the Client **without undue delay and within {{24}} hours** of becoming aware of a personal data breach, and give the information the Client needs to meet its own notification duties;
8. at the end of the services, return or delete the personal data, as the Client chooses, and confirm in writing;
9. make available the information reasonably needed to show compliance, and allow reasonable audits on {{N}} days' notice.

## 3. Client's obligations
The Client confirms it has a lawful basis and has given the required notices for the processing, and that its instructions comply with the PDPA.

## 4. Security measures (minimum)
- Named accounts, least-privilege access, MFA where available
- Encryption in transit and at rest
- Masking or pseudonymisation in non-production environments
- Access logging for systems holding personal data
- datawazi devices: disk encryption, screen lock, up-to-date OS and anti-malware
- No personal data in email, chat or personal storage
- No personal data sent to external AI services without written approval; provider training on Client data disabled

## 5. Approved sub-processors
| Sub-processor | Service | Location |
|---|---|---|
| {{e.g. Microsoft Azure}} | {{hosting}} | {{region}} |

## 6. Liability and term
Liability is as set out in the MSA. This Agreement lasts as long as datawazi processes Client personal data.

| For Client | For datawazi |
|---|---|
| Name / title: | Name / title: |
| Signature: | Signature: |
| Date: | Date: |
