"""Trang duyệt kịch bản chương 1 MVP: mỗi chuỗi một thẻ — nền, người lên hình, chỗ bấm, giấy tài liệu (có / mượn ảnh neo /
chưa có + kế hoạch ảnh), khung ghép lời (lời tạm đánh dấu), lời hiện tại cạnh lời đề xuất, ô Duyệt / Cần sửa.

    PYTHONUTF8=1 python tools/duyet-kich-ban/sinh-trang.py [--out <thư mục>/index.html]

Đọc prototype/noi-dung-mvp/: khung `kich-ban/*.md` + `thu-thach/*.md` (phiên logic), lời `loi/*.md` (phiên truyện) ghép theo mã như
`prototype/tools/noi-dung/ghep-loi.ts` (dòng `- [LỜI mã]` ↔ đoạn `## mã`). Chỗ bấm lấy từ `[KHÁM PHÁ]` của khung. Ảnh dò trong
prototype/src/assets/ theo luật `src/mvp/ui/anh-mvp.ts`; ảnh chưa vào game trong art/mvp-vu1/. Ghi chú lệch, kế hoạch ảnh, lời đề xuất
(theo mã lời): tools/duyet-kich-ban/ghi-chu.json.

Ra: <out>/index.html, <out>/anh/*.webp (ảnh thu nhỏ), <out>/du-lieu/<n>.json (< 45KB mỗi tệp: công cụ đăng Artifact đọc lỗi tệp chữ
~80KB trở lên). Đăng thành Artifact với capabilities {db: {}}, các tệp kia qua `files` + `root`. Trang ghi vào db:
  review/<chuỗi>        {status: ok|fix|"", note}
  edits/<mã lời>~<i>    {text}   — sửa dòng lời hiện tại (i: thứ tự dòng trong đoạn lời)
  edits/dx~<mã lời>~<i> {text}   — sửa dòng lời đề xuất
  edits/anh~<chuỗi>~<id> {text}  — kế hoạch ảnh
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


OUT = Path(arg("--out", str(ROOT / "out" / "duyet-chuong-1" / "index.html")))
ANH = OUT.parent / "anh"


def index(root):
    """tên tệp (không đuôi, viết thường) → đường dẫn; trùng tên thì đuôi ưu tiên trước (như lapChiMuc)."""
    out = {}
    for p in root.rglob("*"):
        if p.suffix.lower() in EXT:
            k = p.stem.lower()
            if k not in out or EXT[p.suffix.lower()] < EXT[out[k].suffix.lower()]:
                out[k] = p
    return out


GAME = index(ASSETS)
_thumbs = {}


def thumb(path, box):
    """Ảnh thu nhỏ ra <out>/anh/, trang trỏ tương đối."""
    key = (str(path), box)
    if key not in _thumbs:
        im = Image.open(path)
        im.thumbnail(box)
        ANH.mkdir(parents=True, exist_ok=True)
        name = f"{path.stem}-{box[0]}.webp"
        im.save(ANH / name, "WEBP", quality=72 if im.mode == "RGB" else 80, method=6)
        _thumbs[key] = f"anh/{name}"
    return _thumbs[key]


def read(p):
    return p.read_text(encoding="utf-8")


# ---------- nhân vật, cảnh
NV = {m.group(1): m.group(2).strip() for m in re.finditer(r"^### ([a-z-]+) — (.+)$", read(ND / "nhan-vat.md"), re.M)}
NV["nguoi-choi"] = "‹tên người chơi›"
TEN = {**NV, "player": "Người chơi", "narrator": "Dẫn truyện"}
CANH, cur = {}, None
for ln in read(ND / "canh.md").splitlines():
    m = re.match(r"^### ([a-z-]+) — (.+)$", ln)
    if m:
        cur = m.group(1); CANH[cur] = {"ten": m.group(2).strip(), "anh": None}
    elif cur and ln.startswith("- Ảnh nền:"):
        CANH[cur]["anh"] = ln.split(":", 1)[1].strip()


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


# ---------- lời: mã → các dòng
LOI = {}
for f in sorted((ND / "loi").glob("*.md")):
    ma = None
    for ln in read(f).splitlines():
        t = ln.rstrip()
        m = re.match(r"^## (.+)$", t)
        if m:
            ma = m.group(1).strip(); LOI[ma] = {"file": f"prototype/noi-dung-mvp/loi/{f.name}", "lines": []}
        elif ma and t and not t.startswith("<!--"):
            LOI[ma]["lines"].append(t)

NOTES = json.loads(read(HERE / "ghi-chu.json"))
DX = NOTES.get("de_xuat", {})

# ---------- một dòng lời → dòng có kiểu
SPEECH = re.compile(r"^\*\*([a-z-]+)\*\*\s*(?:\(([^)]+)\))?:\s*(.*)$")
CMDWHO = re.compile(r'^([a-z-]+)\s*(?:\(([^)]+)\))?:\s*"?(.*?)"?$')


def loi_line(s):
    """Dòng lời (không có '- ' đầu, trừ '> NHIỆM VỤ')."""
    tam = "(tạm)" in s
    s = nv_text(s.replace("(tạm) ", "").replace("(tạm)", ""))
    m = re.match(r"^> NHIỆM VỤ:\s*(.*)$", s)
    if m:
        return {"k": "quest", "t": m.group(1), "tam": tam}
    s = s[2:] if s.startswith("- ") else s
    m = re.match(r"^\[THẺ CHỮ\]\s*\*\*narrator\*\*:\s*(.*)$", s)
    if m:
        return {"k": "card", "t": m.group(1), "tam": tam}
    if s.startswith("[DÀN DỰNG]"):
        return {"k": "stage", "t": s[len("[DÀN DỰNG]"):].strip(), "tam": tam}
    m = re.match(r"^Khi ([^:]+):\s*(.*)$", s)
    if m:
        return {"k": "khi", "when": m.group(1), "t": re.sub(r"\*\*([a-z-]+)\*\*", lambda x: TEN.get(x.group(1), x.group(1)), m.group(2)), "tam": tam}
    m = SPEECH.match(s)
    if m:
        who, bc, t = m.group(1), m.group(2), m.group(3)
        k = "narr" if who == "narrator" else ("think" if who == "player" and t.startswith("(") else "say")
        return {"k": k, "who": who, "bc": bc, "t": t, "tam": tam}
    return {"k": "stage", "t": s, "tam": tam}


def expand_loi(ma, lines, prefix=""):
    out = []
    for i, s in enumerate(lines):
        d = loi_line(s)
        d.update(src="loi", ma=ma, key=f"{prefix}{ma}~{i}")
        out.append(d)
    if not lines:
        out.append({"k": "missing", "t": f"Chưa có lời cho {ma}", "src": "loi", "ma": ma, "key": f"{prefix}{ma}~0"})
    return out


def khung_lines(raw, dx=False):
    """Dòng khung → dòng hiển thị; `- [LỜI mã]` thay bằng lời (hoặc lời đề xuất nếu dx và có)."""
    out, code = [], None
    for ln in raw:
        if code is not None:
            if ln.strip().startswith("```"):
                out.append({"k": "code", "t": "\n".join(code), "src": "khung"}); code = None
            else:
                code.append(ln)
            continue
        if ln.strip().startswith("```"):
            code = []; continue
        if not ln.strip() or ln.strip().startswith("<!--"):
            continue
        m = re.match(r"^- \[LỜI ([^\]]+)\]\s*$", ln)
        if m:
            ma = m.group(1)
            if dx and ma in DX:
                out += expand_loi(ma, DX[ma], "dx~")
            else:
                out += expand_loi(ma, LOI.get(ma, {"lines": []})["lines"])
            continue
        if ln.startswith("  - "):
            if out:
                out[-1].setdefault("opts", []).append(nv_text(ln[4:].strip()))
            continue
        if not ln.startswith("- "):
            continue
        s = ln[2:].strip()
        m = re.match(r"^\[([^\]]+)\]\s*(.*)$", s)
        if m:
            d = {"k": "cmd", "tag": nv_text(m.group(1)), "src": "khung"}
            mw = CMDWHO.match(m.group(2)) if m.group(2) else None
            if mw:
                d.update(who=mw.group(1), bc=mw.group(2), t=nv_text(mw.group(3)))
            elif m.group(2):
                d["t"] = nv_text(m.group(2))
            out.append(d)
        else:
            out.append({"k": "meta", "t": nv_text(s), "src": "khung"})
    return out


# ---------- thẻ thử thách
TT = {}
for f in sorted((ND / "thu-thach").glob("*.md")):
    cid, raw = None, []
    for ln in read(f).splitlines():
        m = re.match(r"^### ([a-z0-9-]+) — (.+?)\s*\{challenge: ([a-z0-9-]+)\}", ln)
        if m:
            cid = m.group(3); TT[cid] = {"title": m.group(2), "raw": [], "file": f.name}
        elif cid:
            TT[cid]["raw"].append(ln)

# ---------- khung
chains = []
for f in sorted((ND / "kich-ban").glob("*.md")):
    grp, c = None, None
    for ln in read(f).splitlines():
        if ln.startswith("## "):
            grp = ln[3:].strip()
        elif ln.startswith("### "):
            m = re.match(r"^### ([a-z0-9-]+) — (.+?)\s*\{cảnh: ([a-z-]+)\}\s*$", ln)
            c = {"id": m.group(1), "title": nv_text(m.group(2)), "canh": m.group(3), "group": grp, "raw": [],
                 "file": f"prototype/noi-dung-mvp/kich-ban/{f.name}"}
            chains.append(c)
        elif c is not None:
            c["raw"].append(ln)


def cast_of(lines):
    seen = {}
    for d in lines:
        if d.get("who") and d["who"] != "narrator":
            seen.setdefault((d["who"], d.get("bc") or "neutral"), None)
        for o in [d.get("t", "")] if d["k"] == "khi" else d.get("opts", []):
            for w, b in re.findall(r"\*\*([a-z-]+)\*\*\s*\(([^)]+)\)", o):
                seen.setdefault((w, b), None)
    return list(seen)


out_chains = []
for c in chains:
    note = NOTES["canh"].get(c["id"], {})
    lines = khung_lines(c["raw"])
    has_dx = any(re.match(r"^- \[LỜI ([^\]]+)\]", l) and re.match(r"^- \[LỜI ([^\]]+)\]", l).group(1) in DX for l in c["raw"])
    dx = khung_lines(c["raw"], dx=True) if has_dx else None

    # thẻ thử thách trong chuỗi: gắn đề bài + lời "Khi …"
    tts = []
    for d in lines:
        if d["k"] == "cmd" and d["tag"].startswith("THỬ THÁCH"):
            cid = d["tag"].split()[-1]
            if cid in TT:
                tts.append({"id": cid, "title": TT[cid]["title"], "lines": khung_lines(TT[cid]["raw"])})

    quest = next((d["t"] for d in lines if d["k"] == "quest"), None)
    lines = [d for d in lines if d["k"] != "quest"]
    if dx:
        dx = [d for d in dx if d["k"] != "quest"]

    # nền
    canh = CANH.get(c["canh"], {"ten": c["canh"], "anh": None})
    bgkey = "ban-do-truong" if c["canh"] == "ban-do" else f"bg-mvp-{c['canh']}"
    bgfile = GAME.get(bgkey)
    dem = GAME.get(f"{bgkey}-dem") if note.get("nen_dem") else None
    bg = {"id": bgfile.stem if bgfile else bgkey, "state": "co" if bgfile else "thieu",
          "img": thumb(bgfile, (720, 405)) if bgfile else None,
          "alt": thumb(dem, (720, 405)) if dem else None, "altId": dem.stem if dem else None}

    allines = lines + (dx or []) + [l for t in tts for l in t["lines"]]
    cast = []
    for who, bc in cast_of(allines):
        p = portrait(who, bc)
        cast.append({"who": who, "name": TEN.get(who, who), "bc": bc, "state": p["state"], "id": p["id"],
                     "file": p["file"].stem if p["file"] else None,
                     "img": thumb(p["file"], (200, 300)) if p["file"] else None})

    assets, spots = [], []
    for d in lines:
        if d["k"] == "cmd" and d["tag"].startswith("KHÁM PHÁ"):
            for o in d.get("opts", []):
                sp = o.split("·")[0].strip()
                nhan = o.split("nhãn:")[-1].strip() if "nhãn:" in o else ""
                spots.append({"sprite": sp, "nhan": nhan})
                if not sp.startswith("nv:"):
                    assets.append({"kind": "Chỗ bấm", "id": sp, "state": "co" if sp in GAME else "thieu",
                                   "img": thumb(GAME[sp], (220, 220)) if sp in GAME else None, "plan": nhan})
    docs = [d["tag"].split()[-1] for d in lines if d["k"] == "cmd" and re.match(r"^(HIỆN TÀI LIỆU|LƯU BẰNG CHỨNG)", d["tag"])]
    docs += note.get("giay", [])
    for d in dict.fromkeys(docs):
        tl = NOTES["tai_lieu"].get(d, {})
        f = ROOT / tl["file"] if tl.get("file") else None
        state = "art" if f and f.exists() else "thieu"
        assets.append({"kind": "Giấy tài liệu", "id": d, "state": state,
                       "img": thumb(f, (360, 360)) if state == "art" else None, "plan": tl.get("ke_hoach", "")})
    for a in note.get("anh_them", []):
        kind = "Biểu cảm" if a["id"].startswith("char-") else ("Nền" if a["id"].startswith("bg-") else "Ảnh thêm")
        assets.append({"kind": kind, "id": a["id"], "state": "thieu", "img": None, "plan": a["ke_hoach"]})

    tam = sum(1 for d in allines if d.get("tam")) - sum(1 for d in (dx or []) if d.get("tam"))
    out_chains.append({"id": c["id"], "title": c["title"], "canh": c["canh"], "canhTen": canh["ten"], "group": c["group"],
                       "quest": quest, "file": c["file"], "bg": bg, "cast": cast, "assets": assets, "spots": spots,
                       "lines": lines, "dx": dx, "tts": tts, "why": NOTES.get("ly_do", {}).get(c["id"], ""),
                       "lech": note.get("lech", []), "tam": tam})

# ---------- ghi ra
OUT.parent.mkdir(parents=True, exist_ok=True)
DL = OUT.parent / "du-lieu"
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
groups = list(dict.fromkeys(c["group"] for c in out_chains))
DATA = {"groups": groups, "names": TEN, "parts": len(parts)}
tpl = read(HERE / "mau-trang.html")
OUT.write_bytes(tpl.replace("/*__DATA__*/null", json.dumps(DATA, ensure_ascii=False)).encode("utf-8"))
miss = sum(1 for c in out_chains for a in c["assets"] + c["cast"] if a["state"] in ("thieu", "muon"))
tam = sum(c["tam"] for c in out_chains)
unused = [m for m in LOI if not any(f"[LỜI {m}]" in l for c in chains for l in c["raw"]) and not any(f"[LỜI {m}]" in l for t in TT.values() for l in t["raw"])]
print(f"{OUT} · {len(out_chains)} chuỗi · {len(parts)} tệp dữ liệu · {len(_thumbs)} ảnh · {miss} ảnh thiếu/mượn · {tam} dòng lời tạm"
      + (f" · lời không gắn khung: {', '.join(unused)}" if unused else ""))
