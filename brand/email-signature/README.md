# Email signature

`signature.html` contains the branded Gmail signature. The logo image is hosted on the website at `https://datawazi.com/email/datawazi-signature-logo.png` (source: `website/site/public/email/`), because Gmail only shows signature images from a public web address.

Email apps don't load custom fonts, so the text uses the system monospace font (Menlo on Mac, Consolas on Windows). The logo is an image, so it always looks exact.

## Install in Gmail
1. Download `signature.html` and open it in **Chrome**.
2. Select everything inside the white box, from the logo down to the "book a 30-min fit check" button, and copy (**Cmd + C**).
3. Gmail → ⚙️ → **See all settings** → **General** → **Signature** → **Create new**, name it `datawazi`, click into the editor and paste (**Cmd + V**).
4. Under **Signature defaults**, choose the **hello@datawazi.com** address and set **For new emails use** and **On reply/forward use** to `datawazi`.
5. Tick **"Insert signature before quoted text in replies"**.
6. **Save Changes** at the bottom of the page, then send yourself a test email.

**If the logo shows as a broken image after pasting** (this happened on the first install): delete the broken image, put the cursor on the top line, click Gmail's **Insert image** icon → **Web address (URL)** → paste `https://datawazi.com/email/datawazi-signature-logo.png` → **Select**, then set the size to **Small**. Optionally select the logo and add the link `https://datawazi.com`.

## Adding a team member
Copy `signature.html`, change the name, title and phone number, and follow the same steps.
