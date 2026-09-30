"""
Beau Papier - image optimiser.

Makes light WebP copies of every photo in clean_images/ so the website loads fast.
The originals in clean_images/ are never modified.

    img/<name>.webp     large version (max 1600 px) - product galleries, hero, full screen
    img/sm/<name>.webp  small version (800 px wide)  - cards and thumbnails

Usage (from the repository folder):
    pip install pillow
    python tools/optimize_images.py

Only new or changed photos are processed, so it is safe to run any time you add photos.
If you forget to run it, the site automatically falls back to the original photo.
"""
import os
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "clean_images"
OUT_L = ROOT / "img"
OUT_S = ROOT / "img" / "sm"
LARGE_EDGE, LARGE_Q = 1600, 80
SMALL_W, SMALL_Q = 800, 78
EXTS = {".jpg", ".jpeg", ".png"}


def convert(src: Path, force=False):
    name = src.stem + ".webp"
    dl, ds = OUT_L / name, OUT_S / name
    if not force and dl.exists() and ds.exists() and dl.stat().st_mtime >= src.stat().st_mtime:
        return False
    im = ImageOps.exif_transpose(Image.open(src))
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") and src.suffix.lower() == ".png" else "RGB")
    large = im.copy()
    large.thumbnail((LARGE_EDGE, LARGE_EDGE), Image.LANCZOS)
    large.save(dl, "WEBP", quality=LARGE_Q, method=6)
    small = im.copy()
    small.thumbnail((SMALL_W, SMALL_W * 3), Image.LANCZOS)
    small.save(ds, "WEBP", quality=SMALL_Q, method=6)
    return True


def main():
    force = "--force" in sys.argv
    OUT_S.mkdir(parents=True, exist_ok=True)
    before = after = n = 0
    for src in sorted(SRC.iterdir()):
        if src.suffix.lower() not in EXTS:
            continue
        if convert(src, force):
            n += 1
            before += src.stat().st_size
            after += (OUT_L / (src.stem + ".webp")).stat().st_size
            print("  ok ", src.name)
    print(f"{n} photo(s) optimised" + (f": {before/1e6:.0f} MB -> {after/1e6:.0f} MB" if n else ""))


if __name__ == "__main__":
    main()
