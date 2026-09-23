from pathlib import Path
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-images" / "assets"
PUBLIC = ROOT / "public" / "assets"

PROJECT_NAMES = {
    "余姚阳明温泉山庄.jpg": "01-yangming.jpg",
    "余姚悦龙湾.jpg": "02-yuelongwan.jpg",
    "温州七都华侨花园.jpg": "03-qidu.jpg",
    "杭州滨融府.jpg": "04-binrongfu.jpg",
    "大冶芳香产业文化展馆.jpg": "05-daye.jpg",
    "方案中的小想法.png": "06-small-ideas.jpg",
}


def save_web_jpeg(source: Path, destination: Path, max_edge: int = 1800) -> None:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
        if image.mode in {"RGBA", "LA"}:
            background = Image.new("RGB", image.size, "#f3f0e8")
            background.paste(image, mask=image.getchannel("A"))
            image = background
        elif image.mode != "RGB":
            image = image.convert("RGB")
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "JPEG", quality=80, optimize=True, progressive=True)


def process_gallery() -> list[Path]:
    written = []
    gallery_root = SOURCE / "gallery"
    for source in gallery_root.rglob("*"):
        if not source.is_file() or source.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        relative = source.relative_to(gallery_root)
        stem = source.stem
        if stem.isdigit():
            stem = f"{int(stem):02d}"
        destination = PUBLIC / "gallery" / relative.parent / f"{stem}.jpg"
        save_web_jpeg(source, destination)
        written.append(destination)
    return written


def process_projects() -> list[Path]:
    written = []
    for source_name, output_name in PROJECT_NAMES.items():
        source = SOURCE / "projects" / source_name
        if not source.exists():
            raise FileNotFoundError(f"Missing project cover: {source}")
        destination = PUBLIC / "projects" / output_name
        save_web_jpeg(source, destination)
        written.append(destination)
    return written


def process_small_ideas() -> list[Path]:
    written = []
    for number in range(1, 4):
        candidates = list((SOURCE / "small-ideas").glob(f"{number:02d}.*"))
        if len(candidates) != 1:
            raise RuntimeError(f"Expected one image for small idea {number:02d}, found {len(candidates)}")
        destination = PUBLIC / "small-ideas" / f"{number:02d}.jpg"
        save_web_jpeg(candidates[0], destination)
        written.append(destination)
    return written


if __name__ == "__main__":
    if not SOURCE.exists():
        raise FileNotFoundError(f"Missing original-image folder: {SOURCE}")
    outputs = process_gallery() + process_projects() + process_small_ideas()
    total_mb = sum(path.stat().st_size for path in outputs) / (1024 * 1024)
    print(f"Prepared {len(outputs)} web images ({total_mb:.1f} MB)")
