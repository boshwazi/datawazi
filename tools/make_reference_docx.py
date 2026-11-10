"""Build brand/templates/reference.docx: the Word style template pandoc uses for exports.

Run from the repo root:  python3 tools/make_reference_docx.py   (needs pandoc + python-docx)
"""
import subprocess
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "brand/templates/reference.docx"
INK = RGBColor(0x0A, 0x0C, 0x0F)
GREY = RGBColor(0x55, 0x5A, 0x54)
# Brand face. Install brand/fonts/obel-mono/ttf/*.ttf to see it in Word; clients without it
# see a system fallback, so send clients the PDF exports (fonts embedded).
HEAD_FONT, BODY_FONT = "Obel Mono", "Obel Mono"


def set_font(style, name, size=None, bold=None, color=None):
    style.font.name = name
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.append(rfonts)
    for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rfonts.set(qn(attr), name)
    for theme_attr in ("w:asciiTheme", "w:hAnsiTheme", "w:cstheme", "w:eastAsiaTheme"):
        if rfonts.get(qn(theme_attr)) is not None:
            del rfonts.attrib[qn(theme_attr)]
    if size:
        style.font.size = Pt(size)
    if bold is not None:
        style.font.bold = bold
    if color is not None:
        style.font.color.rgb = color


def lime_rule(paragraph):
    """Thick lime bottom border under a paragraph."""
    ppr = paragraph._p.get_or_add_pPr()
    bdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    for k, v in (("w:val", "single"), ("w:sz", "18"), ("w:space", "4"), ("w:color", "C8FF2E")):
        bottom.set(qn(k), v)
    bdr.append(bottom)
    ppr.append(bdr)


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["pandoc", "-o", str(OUT), "--print-default-data-file", "reference.docx"], check=True)
    doc = Document(str(OUT))

    for s in doc.sections:
        s.page_height, s.page_width = Cm(29.7), Cm(21.0)  # A4
        s.top_margin = s.bottom_margin = Cm(2.2)
        s.left_margin = s.right_margin = Cm(2.2)
        s.header_distance = s.footer_distance = Cm(1.0)

        hp = s.header.paragraphs[0]
        hp.text = ""
        hp.add_run().add_picture(str(ROOT / "brand/logo/datawazi-wordmark-on-light.png"), width=Cm(3.2))
        lime_rule(hp)

        fp = s.footer.paragraphs[0]
        fp.text = ""
        fp.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = fp.add_run("Datawazi · Data & AI solutions · Malaysia · Confidential · page ")
        r.font.size, r.font.color.rgb, r.font.name = Pt(8), GREY, BODY_FONT
        # PAGE field
        r2 = fp.add_run()
        r2.font.size, r2.font.color.rgb = Pt(8), GREY
        for tag, text in (("begin", None), (None, "PAGE"), ("end", None)):
            if tag:
                el = OxmlElement("w:fldChar")
                el.set(qn("w:fldCharType"), tag)
            else:
                el = OxmlElement("w:instrText")
                el.set(qn("xml:space"), "preserve")
                el.text = text
            r2._r.append(el)

    st = {x.name: x for x in doc.styles}
    for name in ("Normal", "Body Text", "First Paragraph", "Compact", "Block Text"):
        if name in st:
            set_font(st[name], BODY_FONT, 10.5, color=INK)
    if "Body Text" in st:
        st["Body Text"].paragraph_format.space_after = Pt(6)
        st["Body Text"].paragraph_format.line_spacing = 1.25
    if "Block Text" in st:
        set_font(st["Block Text"], BODY_FONT, 10, color=GREY)
    sizes = {"Title": 24, "Subtitle": 12, "Heading 1": 20, "Heading 2": 14, "Heading 3": 12, "Heading 4": 11}
    for name, size in sizes.items():
        if name in st:
            set_font(st[name], HEAD_FONT, size, bold=name != "Subtitle", color=INK)
            pf = st[name].paragraph_format
            pf.space_before = Pt(16 if name in ("Heading 1", "Title") else 12)
            pf.space_after = Pt(6)
    for name in ("Source Code", "Verbatim Char"):
        if name in st:
            set_font(st[name], HEAD_FONT, 9)
    doc.save(str(OUT))
    print("wrote", OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
