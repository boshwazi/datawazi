"""Outline the datawazi_ wordmark and monogram into SVG paths (no font needed to display).

Run from the repo root:  python3 tools/make_logos.py [path/to/font.woff2|ttf]
Default font: Obel Mono ExtraBold (800) if present in brand/fonts/obel-mono/, else JetBrains Mono 800.
Re-run after Obel Mono is added to regenerate every logo file.
Requires: pip install fonttools brotli
"""
import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "brand/logo"
INK, PAPER, LIME = "#0A0C0F", "#EEF0EA", "#C8FF2E"
TRACKING = -0.04  # em, matches the CSS letter-spacing on the wordmark


def pick_font():
    if len(sys.argv) > 1:
        return Path(sys.argv[1])
    obel = ROOT / "brand/fonts/obel-mono/ttf/ObelMono-ExtraBold.ttf"
    if obel.exists():
        return obel
    return ROOT / "brand/fonts/jetbrains-mono/jetbrains-mono-latin-800-normal.woff2"


def outline(font, text):
    """Return list of (char, path_d, x_offset) and total advance, in font units, y-down."""
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    upm = font["head"].unitsPerEm
    ascent = font["hhea"].ascent
    x = 0
    glyphs = []
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[name].draw(TransformPen(pen, (1, 0, 0, -1, x, ascent)))
        glyphs.append((ch, pen.getCommands()))
        x += gs[name].width + TRACKING * upm
    return glyphs, x - TRACKING * upm, upm, ascent


def ink_bounds(font, text):
    """Tight bounds of the drawn glyphs (font units, y-down, same layout as outline())."""
    cmap, gs = font.getBestCmap(), font.getGlyphSet()
    upm, ascent = font["head"].unitsPerEm, font["hhea"].ascent
    x, box = 0, None
    for ch in text:
        name = cmap[ord(ch)]
        bp = BoundsPen(gs)
        gs[name].draw(TransformPen(bp, (1, 0, 0, -1, x, ascent)))
        if bp.bounds:
            b = bp.bounds
            box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
        x += gs[name].width + TRACKING * upm
    return box


SQUARE_THEMES = {  # name: (background, letters, underscore)
    "ink": (INK, PAPER, LIME),
    "lime": (LIME, INK, INK),
    "paper": (PAPER, INK, INK),
}


def square(font, text, fill_ratio, theme):
    """Square artwork, glyphs centred on their ink box, filling fill_ratio of the side.
    fill_ratio keeps the mark inside the circle crop used by social platforms."""
    bg, fg, accent = SQUARE_THEMES[theme]
    glyphs, *_ = outline(font, text)
    x0, y0, x1, y1 = ink_bounds(font, text)
    side = 1080
    scale = side * fill_ratio / max(x1 - x0, y1 - y0)
    tx = side / 2 - scale * (x0 + x1) / 2
    ty = side / 2 - scale * (y0 + y1) / 2
    paths = "\n".join(f'<path fill="{accent if ch == "_" else fg}" d="{d}"/>' for ch, d in glyphs)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}" role="img" aria-label="datawazi_">\n'
            f'<title>datawazi_</title>\n<rect width="{side}" height="{side}" fill="{bg}"/>\n'
            f'<g transform="translate({tx:.1f} {ty:.1f}) scale({scale:.5f})">\n{paths}\n</g></svg>\n')


def svg(glyphs, width, height, fg, accent, bg=None, pad=0, title="datawazi_"):
    w, h = width + 2 * pad, height + 2 * pad
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" role="img" aria-label="{title}">',
             f"<title>{title}</title>"]
    if bg:
        parts.append(f'<rect width="{w:.0f}" height="{h:.0f}" fill="{bg}"/>')
    parts.append(f'<g transform="translate({pad:.0f} {pad:.0f})">')
    for ch, d in glyphs:
        parts.append(f'<path fill="{accent if ch == "_" else fg}" d="{d}"/>')
    parts.append("</g></svg>")
    return "\n".join(parts) + "\n"


def main():
    font_path = pick_font()
    font = TTFont(str(font_path))
    OUT.mkdir(parents=True, exist_ok=True)

    glyphs, adv, upm, ascent = outline(font, "datawazi_")
    descent = abs(font["hhea"].descent)
    height = ascent + descent
    pad = upm * 0.25
    variants = {
        "datawazi-wordmark-on-dark.svg": dict(fg=PAPER, accent=LIME),
        "datawazi-wordmark-on-light.svg": dict(fg=INK, accent=INK),  # lime underscore fails contrast on paper
        "datawazi-wordmark-ink-tile.svg": dict(fg=PAPER, accent=LIME, bg=INK, pad=pad),
        "datawazi-wordmark-lime-tile.svg": dict(fg=INK, accent=INK, bg=LIME, pad=pad),
    }
    for name, kw in variants.items():
        (OUT / name).write_text(svg(glyphs, adv, height, **kw))

    # Monogram: "d_" on a square ink tile (favicon / avatar)
    mg, madv, _, _ = outline(font, "d_")
    side = max(madv, height) + upm * 0.6
    ox, oy = (side - madv) / 2, (side - height) / 2
    body = "\n".join(f'<path fill="{LIME if ch == "_" else PAPER}" d="{d}"/>' for ch, d in mg)
    (OUT / "datawazi-monogram.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side:.0f} {side:.0f}" role="img" aria-label="datawazi_">\n'
        f'<title>datawazi_</title>\n<rect width="{side:.0f}" height="{side:.0f}" rx="{side * 0.12:.0f}" fill="{INK}"/>\n'
        f'<g transform="translate({ox:.0f} {oy:.0f})">\n{body}\n</g></svg>\n')
    # Square social / marketing artwork (1080 x 1080): full wordmark and short "d_" mark
    sq = OUT / "square"
    sq.mkdir(exist_ok=True)
    for theme in SQUARE_THEMES:
        (sq / f"datawazi-square-full-{theme}.svg").write_text(square(font, "datawazi_", 0.66, theme))
        (sq / f"datawazi-square-short-{theme}.svg").write_text(square(font, "d_", 0.52, theme))

    print(f"font: {font_path.relative_to(ROOT) if font_path.is_relative_to(ROOT) else font_path}")
    for p in sorted(OUT.rglob("*.svg")):
        print("wrote", p.relative_to(ROOT))


if __name__ == "__main__":
    main()
