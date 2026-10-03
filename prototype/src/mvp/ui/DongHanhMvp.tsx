/** Chat AI tùy chọn cho Tùng và Hà Vy, dùng ngữ cảnh chỉ gồm sự kiện người chơi đã thấy. */
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useVnStore } from '../../shared/vn/vn-store';
import { anhChanDung } from './anh-mvp';

const BO_BA = ['tung', 'ha-vy'] as const;
type BanBe = (typeof BO_BA)[number];
type TinNhan = { role: 'user' | 'assistant'; content: string };
type NguCanhChat = {
  playerName: string;
  scene: string;
  day: number;
  currentTask: string;
  knownDialogue: { speaker: string; text: string }[];
  unlockedEvidence: { title: string; details: string[] }[];
  completedChallengeTitles: string[];
};

/** Chỉ hiện nhân vật có thoại trong chuỗi hiện tại, giữ hành vi dải "Đi cùng" vốn có. */
function dongHanhCua(kb: KichBanMvp, s: TrangThaiMvp): string[] {
  const c = kb.chuoi.find((x) => x.id === s.conTro?.chuoi);
  if (!c) return [];
  const noi = new Set<string>();
  for (const n of c.nodes) {
    if (n.type === 'line' || n.type === 'reminder') noi.add(n.speaker);
    else if (n.type === 'question' || n.type === 'doi-chat' || n.type === 'branch') noi.add(n.asker.speaker);
  }
  return BO_BA.filter((id) => noi.has(id));
}

function taoNguCanh(kb: KichBanMvp, s: TrangThaiMvp, dienTen: (t: string) => string, backlog: { speakerName: string; text: string }[]): NguCanhChat {
  const chuoi = kb.chuoi.find((x) => x.id === s.conTro?.chuoi);
  const canh = kb.canh.find((x) => x.id === chuoi?.canh || x.id === s.canh);
  const hoSoDaMo = [...s.hoSo.manhMoi, ...s.hoSo.taiLieu, ...s.hoSo.bangChung]
    .map((id) => kb.hoSo[id])
    .filter((the): the is NonNullable<typeof the> => !!the)
    .map((the) => ({
      title: dienTen(the.heading),
      details: Object.values(the.fields).map(dienTen).filter(Boolean).slice(0, 10),
    }));
  const thuThachDaXong = s.thuThachXong
    .map((id) => kb.thuThach[id]?.tieuDe)
    .filter((x): x is string => !!x)
    .slice(-12);

  return {
    playerName: s.tenNguoiChoi,
    scene: [chuoi?.title, canh?.ten].filter(Boolean).join(' · '),
    day: s.ngay,
    currentTask: s.nhacViec?.text ? dienTen(s.nhacViec.text) : s.nhiemVu ?? '',
    // Backlog chỉ chứa thoại đã hiện trên màn hình; giới hạn để mỗi lượt chat gọn.
    knownDialogue: backlog.slice(-30).map((line) => ({ speaker: line.speakerName, text: dienTen(line.text) })),
    unlockedEvidence: hoSoDaMo.slice(0, 20),
    completedChallengeTitles: thuThachDaXong,
  };
}

export function DongHanhMvp({
  kb,
  s,
  dienTen,
  visible = true,
}: {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  dienTen: (t: string) => string;
  visible?: boolean;
}) {
  const ds = dongHanhCua(kb, s);
  const backlog = useVnStore((state) => state.backlog);
  const [nhanVat, setNhanVat] = useState<BanBe | null>(null);
  const [banDo, setBanDo] = useState<Partial<Record<BanBe, TinNhan[]>>>({});
  const [noiDung, setNoiDung] = useState('');
  const [dangGui, setDangGui] = useState(false);
  const [loi, setLoi] = useState('');
  const tinNhanRef = useRef<HTMLDivElement>(null);

  const nguCanh = useMemo(() => taoNguCanh(kb, s, dienTen, backlog), [kb, s, dienTen, backlog]);
  const tenNhanVat = (id: string): string => kb.nhanVat.find((n) => n.id === id)?.ten ?? id;
  const tinNhan = nhanVat ? (banDo[nhanVat] ?? []) : [];

  useEffect(() => {
    if (tinNhanRef.current) tinNhanRef.current.scrollTop = tinNhanRef.current.scrollHeight;
  }, [tinNhan.length, dangGui, nhanVat]);

  useEffect(() => {
    if (!visible) setNhanVat(null);
  }, [visible]);

  if (!visible || ds.length === 0) return null;

  const chonBan = (id: BanBe): void => {
    setNhanVat(id);
    setLoi('');
  };

  const gui = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const text = noiDung.trim();
    if (!nhanVat || !text || dangGui) return;
    const history = banDo[nhanVat] ?? [];
    const next = [...history, { role: 'user' as const, content: text }].slice(-12);
    setBanDo((old) => ({ ...old, [nhanVat]: next }));
    setNoiDung('');
    setLoi('');
    setDangGui(true);
    try {
      const response = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character: nhanVat, message: text, history: history.slice(-10), context: nguCanh }),
      });
      const data = await response.json() as { reply?: unknown; error?: unknown };
      if (!response.ok || typeof data.reply !== 'string') {
        if (response.status === 503) throw new Error('AI chưa được cấu hình trên máy chủ.');
        if (response.status === 429) throw new Error('Tùng với Hà Vy cần nghỉ một chút. Thử lại sau nhé.');
        throw new Error(typeof data.error === 'string' ? data.error : 'Chưa kết nối được. Thử lại nhé.');
      }
      setBanDo((old) => ({ ...old, [nhanVat]: [...next, { role: 'assistant', content: data.reply as string }].slice(-12) }));
    } catch (error) {
      // Giữ câu hỏi trong khung để người chơi gửi lại sau khi mạng/API hoạt động.
      setBanDo((old) => ({ ...old, [nhanVat]: history }));
      setNoiDung(text);
      setLoi(error instanceof Error ? error.message : 'Chưa kết nối được. Thử lại nhé.');
    } finally {
      setDangGui(false);
    }
  };

  return (
    <aside className="dong-hanh" aria-label={`Đi cùng: ${ds.map(tenNhanVat).join(', ')}`}>
      <span className="dong-hanh__nhan">Đi cùng</span>
      {ds.map((id) => {
        const nv = kb.nhanVat.find((n) => n.id === id);
        const url = anhChanDung(id, nv?.bieuCam[0]);
        return (
          <button
            key={id}
            type="button"
            className={`dong-hanh__nguoi${nhanVat === id ? ' is-noi' : ''}`}
            aria-label={`Chat với ${nv?.ten ?? id}`}
            title={`Chat với ${nv?.ten ?? id}`}
            aria-pressed={nhanVat === id}
            onClick={() => chonBan(id as BanBe)}
          >
            {url ? <img src={url} alt="" draggable={false} /> : <span>{(nv?.ten ?? id).charAt(0)}</span>}
          </button>
        );
      })}
      {nhanVat && ds.includes(nhanVat) ? (
        <section className="dong-hanh__chat" aria-label={`Chat với ${tenNhanVat(nhanVat)}`}>
          <header className="dong-hanh__chat-dau">
            <b>{tenNhanVat(nhanVat)}</b>
            <button type="button" onClick={() => setNhanVat(null)} aria-label="Đóng chat">×</button>
          </header>
          <p className="dong-hanh__chat-rieng-tu">AI dùng tin nhắn và tiến trình, thoại, hồ sơ đã mở để trả lời.</p>
          <div ref={tinNhanRef} className="dong-hanh__tin-nhan" aria-live="polite">
            {tinNhan.length === 0 ? (
              <div className="dong-hanh__goi-y">
                <p>{nhanVat === 'tung' ? 'Muốn tìm đường, nhớ lịch hay đang bí chỗ nào?' : 'Có dữ kiện nào mình cùng kiểm tra không?'}</p>
                <button type="button" onClick={() => setNoiDung(nhanVat === 'tung' ? 'Tớ nên chú ý điều gì ở đây?' : 'Mình đã biết chắc những gì rồi?')}>Gợi ý câu hỏi</button>
              </div>
            ) : tinNhan.map((item, index) => (
              <p key={`${index}-${item.role}`} className={`dong-hanh__tin-nhan-muc dong-hanh__tin-nhan-muc--${item.role}`}>
                {item.role === 'assistant' ? <b>{tenNhanVat(nhanVat)}</b> : <b>{s.tenNguoiChoi || 'Bạn'}</b>} {item.content}
              </p>
            ))}
            {dangGui ? <p className="dong-hanh__dang-go">{tenNhanVat(nhanVat)} đang nghĩ…</p> : null}
          </div>
          {loi ? <p className="dong-hanh__loi" role="alert">{loi}</p> : null}
          <form className="dong-hanh__nhap" onSubmit={gui}>
            <label className="visually-hidden" htmlFor="dong-hanh-cau-hoi">Nhắn {tenNhanVat(nhanVat)}</label>
            <input id="dong-hanh-cau-hoi" value={noiDung} onChange={(event) => setNoiDung(event.target.value)} maxLength={600} placeholder="Nhắn cho bạn ấy…" disabled={dangGui} />
            <button type="submit" disabled={dangGui || !noiDung.trim()}>{dangGui ? '…' : 'Gửi'}</button>
          </form>
        </section>
      ) : null}
    </aside>
  );
}
