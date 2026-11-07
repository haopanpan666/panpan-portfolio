"""Refresh the existing web-font subset from the same installed source font.

Requires fonttools and brotli. Pass --source-font with the original font path.
Existing characters are retained; current site copy supplies additional glyphs.
"""

import argparse
import hashlib
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-font", required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    target = root / "public/assets/fonts/nanxi-chuxiasong.woff2"
    with TTFont(target) as existing:
        retained = set(existing.getBestCmap())
    copy = (root / "src/main.jsx").read_text(encoding="utf-8")
    requested = retained | {ord(char) for char in copy}
    font = TTFont(args.source_font)
    font.recalcTimestamp = False
    available = set(font.getBestCmap())
    missing = {code for code in requested - available if 0x3400 <= code <= 0x9FFF}
    if missing:
        raise ValueError(f"Original font lacks required Chinese glyphs: {sorted(missing)}")
    options = subset.Options()
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=requested & available)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(target)
    # A stable URL can leave an already-open page using its cached old font face.
    # Reference this content-addressed file in both @font-face and the preload.
    content = target.read_bytes()
    digest = hashlib.sha256(content).hexdigest()[:12]
    versioned = target.with_stem(f"{target.stem}-{digest}")
    versioned.write_bytes(content)
    with TTFont(target) as result:
        covered = set(result.getBestCmap())
        assert retained <= covered, "An existing glyph was removed"
        assert requested & available <= covered, "A requested glyph is missing"
    print(f"Web font: {len(retained)} -> {len(covered)} characters; {target.stat().st_size} bytes")
    print(f"Update CSS and HTML preload to: /assets/fonts/{versioned.name}")


if __name__ == "__main__":
    main()
