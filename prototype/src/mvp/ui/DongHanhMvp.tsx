/** Chat AI tùy chọn cho Tùng và Hà Vy, dùng ngữ cảnh chỉ gồm sự kiện từng nhân vật đã chứng kiến. */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useKhoMvp } from '../store/kho-mvp';
import { banDangCoMat, khoaNguCanhDongHanh, type BanDongHanhMvp as BanBe } from '../engine/tri-nho-dong-hanh';
import { taoNguCanhDongHanh } from '../engine/ngu-canh-dong-hanh';
import { anhChanDung } from './anh-mvp';
import { HighlightText } from '../../shared/highlight/HighlightText';

export function DongHanhMvp({
  kb,
  s,
  visible = true,
}: {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  visible?: boolean;
}) {
  const ds = banDangCoMat(kb, s);
  const ghiNhanChat = useKhoMvp((k) => k.ghiNhanChat);
  const [nhanVat, setNhanVat] = useState<BanBe | null>(null);
  const [noiDung, setNoiDung] = useState('');
  const [dangGui, setDangGui] = useState(false);
  const [loi, setLoi] = useState('');
  const tinNhanRef = useRef<HTMLDivElement>(null);

  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  const tenNhanVat = (id: string): string => kb.nhanVat.find((n) => n.id === id)?.ten ?? id;
  const tinNhan = nhanVat ? (s.triNhoDongHanh?.nhanVat[nhanVat].hoiThoai ?? []) : [];

  useEffect(() => {
    if (tinNhanRef.current) tinNhanRef.current.scrollTop = tinNhanRef.current.scrollHeight;
  }, [tinNhan.length, dangGui, nhanVat]);

  if (!visible || ds.length === 0) return null;

  const chonBan = (id: BanBe): void => {
    request.current?.abort();
    setDangGui(false); setNoiDung('');
    setNhanVat(id);
    setLoi('');
  };

  const gui = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const text = noiDung.trim();
    if (!nhanVat || !text || dangGui) return;
    const ban = nhanVat;
    const current = useKhoMvp.getState().trangThai;
    if (!current || !banDangCoMat(kb, current).includes(ban)) return;
    const key = khoaNguCanhDongHanh(current, ban);
    const lan = useKhoMvp.getState().lanDoiVan;
    const history = current.triNhoDongHanh?.nhanVat[ban].hoiThoai ?? [];
    const next = [...history, { role: 'user' as const, content: text }].slice(-12);
    if (!ghiNhanChat(ban, next, key, lan)) return;
    // A legacy save gains its first observation when chat starts.
    const observed = useKhoMvp.getState().trangThai!;
    const requestKey = khoaNguCanhDongHanh(observed, ban);
    const stillHere = (): boolean => {
      const latest = useKhoMvp.getState().trangThai;
      return !!latest && useKhoMvp.getState().lanDoiVan === lan && khoaNguCanhDongHanh(latest, ban) === requestKey && !controller.signal.aborted;
    };
    const controller = new AbortController();
    request.current = controller;
    setNoiDung(''); setLoi(''); setDangGui(true);
    try {
      const context = await taoNguCanhDongHanh(kb, observed, ban, text);
      if (!stillHere()) return;
      const payload = { character: ban, message: text, history: history.slice(-10), context };
      while (new TextEncoder().encode(JSON.stringify(payload)).length > 23_000 && payload.history.length) payload.history.shift();
      const response = await fetch('/api/companion/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal,
      });
      const data = await response.json() as { reply?: unknown; error?: unknown };
      if (!response.ok || typeof data.reply !== 'string') {
        if (response.status === 503) throw new Error('AI chưa được cấu hình trên máy chủ.');
        if (response.status === 429) throw new Error('Bạn ấy cần nghỉ một chút. Thử lại sau nhé.');
        throw new Error(typeof data.error === 'string' ? data.error : 'Chưa kết nối được. Thử lại nhé.');
      }
      if (stillHere()) ghiNhanChat(ban, [...next, { role: 'assistant', content: data.reply }], requestKey, lan);
    } catch (error) {
      if (stillHere()) {
        ghiNhanChat(ban, history, requestKey, lan);
        setNoiDung(text);
        setLoi(error instanceof Error ? error.message : 'Chưa kết nối được. Thử lại nhé.');
      }
    } finally {
      if (request.current === controller) { request.current = null; setDangGui(false); }
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
          <p className="dong-hanh__chat-rieng-tu">Tin nhắn và dữ kiện bạn ấy đã chứng kiến được gửi cho AI để trả lời.</p>
          <div ref={tinNhanRef} className="dong-hanh__tin-nhan" aria-live="polite">
            {tinNhan.length === 0 ? (
              <div className="dong-hanh__goi-y">
                <p>{nhanVat === 'tung' ? 'Muốn tìm đường, nhớ lịch hay đang bí chỗ nào?' : 'Có dữ kiện nào mình cùng kiểm tra không?'}</p>
                <button type="button" onClick={() => setNoiDung(nhanVat === 'tung' ? 'Tớ nên chú ý điều gì ở đây?' : 'Mình đã biết chắc những gì rồi?')}>Gợi ý câu hỏi</button>
              </div>
            ) : tinNhan.map((item, index) => (
              <p key={`${index}-${item.role}`} className={`dong-hanh__tin-nhan-muc dong-hanh__tin-nhan-muc--${item.role}`}>
                {item.role === 'assistant' ? <b>{tenNhanVat(nhanVat)}</b> : <b>{s.tenNguoiChoi || 'Bạn'}</b>} <HighlightText text={item.content} />
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
