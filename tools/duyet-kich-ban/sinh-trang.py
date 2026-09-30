"""Trang duyệt kịch bản chương 1 MVP: mỗi chuỗi hội thoại một thẻ — nền, người lên hình, vật, giấy tài liệu
(có / mượn ảnh neo / chưa có + kế hoạch ảnh), thoại hiện tại cạnh thoại đề xuất, ô Duyệt / Cần sửa.

    PYTHONUTF8=1 python tools/duyet-kich-ban/sinh-trang.py [--out <file.html>]

Đọc prototype/noi-dung-mvp/ (kich-ban, nhan-vat, dia-diem), dò ảnh trong prototype/src/assets/ theo đúng luật
`src/mvp/ui/anh-mvp.ts` (nền bg-mvp-<cảnh>, chân dung char-<mã>-<biểu cảm> → anchor → char-<mã>), ảnh chưa vào game
trong art/mvp-vu1/. Ghi chú lệch, kế hoạch ảnh, thoại đề xuất: tools/duyet-kich-ban/ghi-chu.json.
Ảnh thu nhỏ ghi vào <out>/anh/, thoại vào <out>/du-lieu/<n>.json; đăng kèm trang qua `files`. Đăng thành Artifact với capabilities {db: {}}:
  review/<chuỗi>  {status: ok|fix|"", note}
  edits/<khóa>    {text}   — cur-<chuỗi>-<i> (thoại hiện tại) · dx-<chuỗi>-<i> (đề xuất) · anh-<chuỗi>-<id ảnh>
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parents[2]
ND = ROOT / "prototype" / "noi-dung-mvp"
ASSETS = ROOT / "prototype" / "src" / "assets"
ART = ROOT / "art" / "mvp-vu1"
HERE = Path(__file__).resolve().parent
EXT = {".webp": 0, ".png": 1, ".jpg": 2, ".jpeg": 3}


def arg(flag, default=None):
    a = sys.argv
    return a[a.index(flag) + 1] if flag in a and a.index(flag) + 1 < len(a) else default


def index(root):
    """tên tệp (không đuôi, viết thường) → đường dẫn; trùng tên thì đuôi ưu tiên trước (như lapChiMuc)."""
    out = {}
    for p in root.rglob("*"):
        if p.suffix.lower() in EXT:
            k = p.stem.lower()
            if k not in out or EXT[p.suffix.lower()] < EXT[out[k].suffix.lower()]:
                out[k] = p
    return out


GAME, ARTIDX = index(ASSETS), index(ART)
_thumbs = {}


OUT = Path(arg("--out", str(ROOT / "out" / "duyet-chuong-1" / "index.html")))
ANH = OUT.parent / "anh"


def thumb(path, box):
    """Ảnh thu nhỏ ghi ra <thư mục out>/anh/<tên>.webp, trang trỏ tương đối (đăng kèm qua `files` của Artifact).
    Không nhúng data URI: trang vài MB thì công cụ đăng Artifact đọc tệp lỗi."""
    key = (str(path), box)
    if key not in _thumbs:
        im = Image.open(path)
        im.thumbnail(box)
        ANH.mkdir(parents=True, exist_ok=True)
        name = f"{path.stem}-{box[0]}.webp"
        im.save(ANH / name, "WEBP", quality=72 if im.mode == "RGB" else 80, method=6)
        _thumbs[key] = f"anh/{name}"
    return _thumbs[key]


# ---------- nhân vật
NV = {}
for m in re.finditer(r"^### ([a-z-]+) — (.+)$", (ND / "nhan-vat.md").read_text(encoding="utf-8"), re.M):
    NV[m.group(1)] = m.group(2).strip()
NV["nguoi-choi"] = "‹tên người chơi›"
TEN = {**NV, "player": "Người chơi", "narrator": "Dẫn truyện"}


def nv_text(s):
    def rep(m):
        ma, tc = m.group(1), m.group(2)
        t = NV.get(ma, ma)
        return t[0].lower() + t[1:] if tc and ma != "nguoi-choi" else t
    return re.sub(r"\{\{nv\.([a-z-]+)(\.trong-cau)?\}\}", rep, s)


def portrait(ma, bieu):
    """Theo anhChanDung: char-<mã>-<bc> → char-<mã>-anchor → char-<mã> → char-<mã>-neutral."""
    ma = "nguoi-choi" if ma == "player" else ma
    tries = ([f"char-{ma}-{bieu}"] if bieu else []) + [f"char-{ma}-anchor", f"char-{ma}", f"char-{ma}-neutral"]
    for i, t in enumerate(tries):
        if t in GAME:
            exact = i == 0 or not bieu or bieu == "neutral"
            return {"state": "co" if exact else "muon", "file": GAME[t], "id": f"char-{ma}-{bieu or 'neutral'}"}
    return {"state": "thieu", "file": None, "id": f"char-{ma}-{bieu or 'neutral'}"}


# ---------- địa điểm: chuỗi → vật, tài liệu, bằng chứng
DK = {}   # chuỗi → [{sprite, docs, ev}]
cur_loc = None
for line in (ND / "dia-diem.md").read_text(encoding="utf-8").splitlines():
    if line.startswith("### "):
        cur = {"sprite": None, "doc": None, "ev": None, "chuoi": None}
        cur_loc = cur
    elif cur_loc is not None and line.startswith("- "):
        k, _, v = line[2:].partition(":")
        v = v.strip()
        if k == "Chuỗi":
            cur_loc["chuoi"] = v
            DK.setdefault(v, []).append(cur_loc)
        elif k == "Ảnh":
            cur_loc["sprite"] = v.split("·")[0].strip()
        elif k == "Hiện tài liệu":
            cur_loc["doc"] = v
        elif k == "Lưu bằng chứng":
            cur_loc["ev"] = v

NOTES = json.loads((HERE / "ghi-chu.json").read_text(encoding="utf-8"))


# ---------- phân tích một dòng kịch bản
SPEECH = re.compile(r"^\*\*([a-z-]+)\*\*\s*(?:\(([^)]+)\))?:\s*(.*)$")
CMDWHO = re.compile(r'^([a-z-]+)\s*(?:\(([^)]+)\))?:\s*"?(.*?)"?$')


def parse_lines(raw):
    """raw: các dòng Markdown của một chuỗi → danh sách dòng có kiểu."""
    out, code = [], None
    for ln in raw:
        if code is not None:
            if ln.strip().startswith("```"):
                out.append({"k": "code", "t": "\n".join(code)})
                code = None
            else:
                code.append(ln)
            continue
        if ln.strip().startswith("```"):
            code = []
            continue
        if not ln.strip() or ln.strip().startswith("<!--"):
            continue
        if ln.startswith("  - "):
            s = nv_text(ln[4:].strip())
            if out:
                out[-1].setdefault("opts", []).append(s)
            continue
        if not ln.startswith("- "):
            continue
        s = ln[2:].strip()
        m = re.match(r"^\[THẺ CHỮ\]\s*\*\*narrator\*\*:\s*(.*)$", s)
        if m:
            out.append({"k": "card", "t": nv_text(m.group(1))}); continue
        if s.startswith("[DÀN DỰNG]"):
            out.append({"k": "stage", "t": nv_text(s[len("[DÀN DỰNG]"):].strip())}); continue
        m = SPEECH.match(s)
        if m:
            who, bc, t = m.group(1), m.group(2), nv_text(m.group(3))
            k = "narr" if who == "narrator" else ("think" if who == "player" and t.startswith("(") else "say")
            out.append({"k": k, "who": who, "bc": bc, "t": t}); continue
        m = re.match(r"^\[([^\]]+)\]\s*(.*)$", s)
        if m:
            tag, rest = m.group(1), m.group(2)
            d = {"k": "cmd", "tag": nv_text(tag)}
            mw = CMDWHO.match(rest) if rest else None
            if mw:
                d.update(who=mw.group(1), bc=mw.group(2), t=nv_text(mw.group(3)))
            elif rest:
                d["t"] = nv_text(rest)
            out.append(d); continue
        out.append({"k": "stage", "t": nv_text(s)})
    return out


def cast_of(lines):
    seen = {}
    for d in lines:
        if d.get("who") and d["who"] != "narrator":
            seen.setdefault((d["who"], d.get("bc") or "neutral"), None)
        for o in d.get("opts", []):
            for w, b in re.findall(r"\*\*([a-z-]+)\*\*\s*\(([^)]+)\)", o):
                seen.setdefault((w, b), None)
    return list(seen)


# ---------- đọc kịch bản
FILES = sorted((ND / "kich-ban").glob("*.md"))
groups, chains = [], []
for f in FILES:
    text = f.read_text(encoding="utf-8").splitlines()
    grp, cur = None, None
    for ln in text:
        if ln.startswith("## "):
            grp = ln[3:].strip()
            groups.append(grp)
        elif ln.startswith("### "):
            m = re.match(r"^### ([a-z0-9-]+) — (.+?)\s*\{cảnh: ([a-z-]+)\}\s*$", ln)
            cur = {"id": m.group(1), "title": nv_text(m.group(2)), "canh": m.group(3), "group": grp, "raw": [], "quest": None,
                   "file": f"prototype/noi-dung-mvp/kich-ban/{f.name}"}
            chains.append(cur)
        elif cur is not None:
            mq = re.match(r"^> NHIỆM VỤ:\s*(.*)$", ln)
            if mq:
                cur["quest"] = nv_text(mq.group(1))
            else:
                cur["raw"].append(ln)

CANH = {m.group(1): m.group(2) for m in re.finditer(r"^### ([a-z-]+) — (.+)$", (ND / "canh.md").read_text(encoding="utf-8"), re.M)}

out_chains = []
for c in chains:
    note = NOTES["canh"].get(c["id"], {})
    lines = parse_lines(c["raw"])
    dx_raw = NOTES["de_xuat"].get(c["id"])
    dx = parse_lines(dx_raw) if dx_raw else None
    assets = []

    # nền
    dem = c["id"].startswith("toi-") or note.get("nen_dem")
    runtime_dem = c["id"].startswith("toi-")
    bgkey = "ban-do-truong" if c["canh"] == "ban-do" else f"bg-mvp-{c['canh']}"
    bgfile = GAME.get(f"{bgkey}-dem") if runtime_dem and f"{bgkey}-dem" in GAME else GAME.get(bgkey)
    bg_dem_alt = GAME.get(f"{bgkey}-dem") if dem and not runtime_dem else None
    bg = {"id": bgfile.stem if bgfile else bgkey, "state": "co" if bgfile else "thieu",
          "img": thumb(bgfile, (720, 405)) if bgfile else None,
          "alt": thumb(bg_dem_alt, (720, 405)) if bg_dem_alt else None, "altId": bg_dem_alt.stem if bg_dem_alt else None}

    # người lên hình
    cast = []
    for who, bc in cast_of(lines + (dx or [])):
        p = portrait(who, bc)
        cast.append({"who": who, "name": TEN.get(who, who), "bc": bc, "state": p["state"], "id": p["id"],
                     "file": p["file"].stem if p["file"] else None,
                     "img": thumb(p["file"], (200, 300)) if p["file"] else None})

    # vật, tài liệu, bằng chứng
    docs = [d["tag"].split()[-1] for d in lines if d["k"] == "cmd" and d["tag"].startswith("HIỆN TÀI LIỆU")]
    for dk in DK.get(c["id"], []):
        if dk["sprite"] and not dk["sprite"].startswith("nv:"):
            sp = dk["sprite"]
            assets.append({"kind": "Vật bấm được", "id": sp, "state": "co" if sp in GAME else "thieu",
                           "img": thumb(GAME[sp], (220, 220)) if sp in GAME else None, "plan": ""})
        if dk["doc"]:
            docs.append(dk["doc"])
        if dk["ev"]:
            docs.append(dk["ev"])
    if c["id"] == "n5-nop-hai-ma":
        docs.append("so-niem-phong")
    for d in dict.fromkeys(docs):
        tl = NOTES["tai_lieu"].get(d, {})
        f = ROOT / tl["file"] if tl.get("file") else None
        state = "art" if f and f.exists() else "thieu"
        assets.append({"kind": "Giấy tài liệu", "id": d, "state": state,
                       "img": thumb(f, (360, 360)) if state == "art" else None, "plan": tl.get("ke_hoach", "")})
    for a in note.get("anh_them", []):
        kind = "Biểu cảm" if a["id"].startswith("char-") else "Ảnh thêm"
        assets.append({"kind": kind, "id": a["id"], "state": "thieu", "img": None, "plan": a["ke_hoach"]})

    out_chains.append({"id": c["id"], "title": c["title"], "canh": c["canh"], "canhTen": CANH.get(c["canh"], c["canh"]),
                       "group": c["group"], "quest": c["quest"], "file": c["file"], "bg": bg, "cast": cast,
                       "assets": assets, "lines": lines, "dx": dx, "why": NOTES.get("ly_do", {}).get(c["id"], ""),
                       "lech": note.get("lech", []), "dem": bool(dem), "runtimeDem": runtime_dem})

# Thoại tách thành du-lieu/<n>.json, mỗi tệp < 45KB: công cụ đăng Artifact đọc lỗi (EBADF) tệp chữ ~80KB trở lên.
out = OUT
out.parent.mkdir(parents=True, exist_ok=True)
DL = out.parent / "du-lieu"
DL.mkdir(exist_ok=True)
for old in DL.glob("*.json"):
    old.unlink()
parts, buf = [], []
for c in out_chains:
    if buf and len(json.dumps(buf + [c], ensure_ascii=False).encode()) > 45000:
        parts.append(buf); buf = []
    buf.append(c)
parts.append(buf)
for i, p in enumerate(parts):
    (DL / f"{i}.json").write_bytes(json.dumps(p, ensure_ascii=False).encode("utf-8"))
DATA = {"groups": list(dict.fromkeys(groups)), "names": TEN, "parts": len(parts)}
tpl = (HERE / "mau-trang.html").read_text(encoding="utf-8")
out.write_bytes(tpl.replace("/*__DATA__*/null", json.dumps(DATA, ensure_ascii=False)).encode("utf-8"))
miss = sum(1 for c in out_chains for a in c["assets"] + c["cast"] if a["state"] in ("thieu", "muon"))
print(f"{out} · {len(out_chains)} chuỗi · {len(_thumbs)} ảnh thu nhỏ · {miss} ảnh thiếu/mượn · {out.stat().st_size // 1024} KB")
