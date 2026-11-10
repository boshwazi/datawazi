# Obel Mono — not yet downloaded

The brand face is **Obel Mono** (free, SIL OFL) from https://typographic.systems/obel-mono.

It could not be downloaded automatically: the cloud session's network policy blocks `typographic.systems`.
To add it, either allow that host in the session's network settings and ask Claude to fetch it, or download it yourself and drop the files here:

- `ObelMono-*.woff2` (web) and `ObelMono-*.ttf` (desktop / decks)
- the licence file (`OFL.txt`)

Then add the `@font-face` rules to `brand/tokens.css`. Everything already falls back to JetBrains Mono (`../jetbrains-mono/`).
