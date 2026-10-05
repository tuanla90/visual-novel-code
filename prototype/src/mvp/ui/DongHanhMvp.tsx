/** Trò chuyện cùng những người đang có mặt; mỗi người giữ ký ức riêng của ván. */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useKhoMvp } from '../store/kho-mvp';
import { banDangCoMat, khoaNguCanhDongHanh, type BanDongHanhMvp as BanBe, type TinNhanNhomDongHanhMvp as TinNhan } from '../engine/tri-nho-dong-hanh';
import { taoNguCanhDongHanh } from '../engine/ngu-canh-dong-hanh';
import { routeCompanion } from '../../../companion-routing.mjs';
import { anhChanDung } from './anh-mvp';
import { HighlightText } from '../../shared/highlight/HighlightText';
import { useVnStore } from '../../shared/vn/vn-store';
import { dienTen, tenNguoiNoi } from '../engine/may';

function lichSu(s: TrangThaiMvp): TinNhan[] {
  if (s.triNhoDongHanh?.hoiThoaiNhom) return s.triNhoDongHanh.hoiThoaiNhom;
  // Keep conversations from older saves, without making the other character a witness.
  return (['tung', 'ha-vy'] as const).flatMap((id) => (s.triNhoDongHanh?.nhanVat[id].hoiThoai ?? []).map((item) => ({
    ...item, ...(item.role === 'assistant' ? { character: id } : { target: id }), heardBy: [id],
  })));
}

export function DongHanhMvp({ kb, s, visible = true }: { kb: KichBanMvp; s: TrangThaiMvp; visible?: boolean }) {
  const ds = banDangCoMat(kb, s);
  const ghiNhanChat = useKhoMvp((k) => k.ghiNhanChatNhom);
  const [mo, setMo] = useState(false);
  const [nguoiNhan, setNguoiNhan] = useState<BanBe | null>(null);
  const [noiDung, setNoiDung] = useState('');
  const [dangGui, setDangGui] = useState<BanBe | null>(null);
  const [tinDangGui, setTinDangGui] = useState<TinNhan | null>(null);
  const [loi, setLoi] = useState('');
  const [moLoiNhac, setMoLoiNhac] = useState(false);
  const tinNhanRef = useRef<HTMLDivElement>(null);
  const nhapRef = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  const ten = (id: string): string => kb.nhanVat.find((n) => n.id === id)?.ten ?? id;
  const target = nguoiNhan && ds.includes(nguoiNhan) ? nguoiNhan : null;
  const tinNhan = lichSu(s);
  const loiNhac = s.nhacViec ? dienTen(kb, s, s.nhacViec.text) : '';
  useEffect(() => {
    if (tinNhanRef.current) tinNhanRef.current.scrollTop = tinNhanRef.current.scrollHeight;
  }, [tinNhan.length, dangGui, mo]);
  useEffect(() => { if (mo) nhapRef.current?.focus(); }, [mo]);
  if (!visible || !ds.length) return null;

  const moChat = (): void => {
    const vn = useVnStore.getState();
    vn.setAutoMode(false); vn.setSkipMode(false); vn.setGiuTua(false);
    setMo(true); setNguoiNhan(null);
  };

  const gui = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const message = noiDung.trim();
    if (!message || request.current) return;
    const store = useKhoMvp.getState();
    const current = store.trangThai;
    if (!current) return;
    const present = banDangCoMat(kb, current);
    if (!present.length) return;
    const keys = Object.fromEntries(present.map((id) => [id, khoaNguCanhDongHanh(current, id)]));
    const history = lichSu(current);
    if (!ghiNhanChat(history, keys, store.lanDoiVan)) return;
    const observed = useKhoMvp.getState().trangThai!;
    const requestKeys = Object.fromEntries(present.map((id) => [id, khoaNguCanhDongHanh(observed, id)]));
    const controller = new AbortController();
    request.current = controller;
    const stillHere = (): boolean => {
      const latest = useKhoMvp.getState();
      return !!latest.trangThai && latest.lanDoiVan === store.lanDoiVan && !controller.signal.aborted
        && JSON.stringify(banDangCoMat(kb, latest.trangThai)) === JSON.stringify(present)
        && present.every((id) => khoaNguCanhDongHanh(latest.trangThai!, id) === requestKeys[id]);
    };
    const pending: TinNhan = { role: 'user', content: message, heardBy: present, ...(target ? { target } : {}) };
    setTinDangGui(pending); setNoiDung(''); setLoi('');
    setDangGui(routeCompanion(present, message, target).primary ?? present[0]!);
    try {
      const contexts = Object.fromEntries(await Promise.all(present.map(async (id) => [id,
        await taoNguCanhDongHanh(kb, observed, id, message, present.length > 1 ? 9_000 : 16_000)])));
      if (!stillHere()) return;
      const payload = { characters: present, target, message, history: history.slice(-18).map((item) => ({ ...item, content: item.content.slice(0, 600) })), contexts };
      const bytes = (): number => new TextEncoder().encode(JSON.stringify(payload)).length;
      while (bytes() > 23_000 && payload.history.length) payload.history.shift();
      if (bytes() > 23_000) throw new Error('Cuộc trò chuyện đang quá dài. Thử một câu hỏi ngắn hơn nhé.');
      const response = await fetch('/api/companion/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal,
      });
      const data = await response.json() as { replies?: { character?: unknown; content?: unknown }[]; error?: unknown };
      if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Chưa nhận được câu trả lời. Thử lại nhé.');
      const replies: TinNhan[] = [];
      for (const item of Array.isArray(data.replies) ? data.replies.slice(0, 2) : []) {
        if (!present.includes(item.character as BanBe) || typeof item.content !== 'string' || !item.content.trim()
          || replies.some((reply) => reply.character === item.character)) continue;
        replies.push({ role: 'assistant', character: item.character as BanBe, content: item.content.slice(0, 1200), heardBy: present });
      }
      if (!replies.length) throw new Error('Chưa nhận được câu trả lời. Thử lại nhé.');
      if (stillHere()) ghiNhanChat([...history, pending, ...replies], requestKeys, store.lanDoiVan);
    } catch (error) {
      if (stillHere()) { setNoiDung(message); setLoi(error instanceof Error ? error.message : 'Chưa kết nối được. Thử lại nhé.'); }
    } finally {
      if (request.current === controller) {
        request.current = null; setDangGui(null); setTinDangGui(null);
        nhapRef.current?.focus();
      }
    }
  };

  return (
    <aside className="dong-hanh" aria-label={'Đi cùng: ' + ds.map(ten).join(', ')} onClick={(event) => event.stopPropagation()}>
      <button type="button" className="dong-hanh__nhan" aria-expanded={mo} aria-controls="dong-hanh-tro-chuyen"
        onClick={() => { if (mo) setMo(false); else moChat(); }}>Đi cùng</button>
      {ds.map((id) => {
        const nv = kb.nhanVat.find((n) => n.id === id);
        const url = anhChanDung(id, nv?.bieuCam[0]);
        return <button key={id} type="button" className={'dong-hanh__nguoi' + (mo && (!target || target === id) ? ' is-noi' : '')}
          data-nhan-vat={id} aria-label={'Trò chuyện với ' + ten(id)} title={'Trò chuyện với ' + ten(id)}
          aria-expanded={mo} aria-controls="dong-hanh-tro-chuyen"
          onClick={moChat}>
          {url ? <img src={url} alt="" draggable={false} /> : <span>{ten(id).charAt(0)}</span>}
        </button>;
      })}
      {mo ? <section id="dong-hanh-tro-chuyen" className="dong-hanh__chat" aria-label="Trò chuyện cùng bạn đồng hành"
        onKeyDown={(event) => { event.stopPropagation(); if (event.key === 'Escape') setMo(false); }}
        onClick={(event) => event.stopPropagation()}>
        <header className="dong-hanh__chat-dau">
          {ds.length > 1 ? <div className="dong-hanh__nguoi-nhan" role="group" aria-label="Hỏi ai">
            <button type="button" aria-pressed={!target} disabled={!!dangGui} onClick={() => setNguoiNhan(null)}>Cả nhóm</button>
            {ds.map((id) => <button key={id} type="button" aria-pressed={target === id} disabled={!!dangGui} onClick={() => setNguoiNhan(id)}>{ten(id)}</button>)}
          </div> : <b>{ten(ds[0]!)}</b>}
          <button type="button" onClick={() => setMo(false)} aria-label="Đóng cuộc trò chuyện">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </header>
        {loiNhac && s.nhacViec ? <button type="button" className={'dong-hanh__viec' + (moLoiNhac ? ' is-expanded' : '')}
          aria-expanded={moLoiNhac} onClick={() => setMoLoiNhac(!moLoiNhac)} title={loiNhac}>
          <b>Việc đang làm · {tenNguoiNoi(kb, s.nhacViec.nhanVat, s)}</b>
          <span><HighlightText text={loiNhac} /></span>
        </button> : null}
        <div ref={tinNhanRef} className="dong-hanh__tin-nhan" role="log" aria-label="Lời trò chuyện" aria-live="polite" aria-relevant="additions text">
          {!tinNhan.length && !tinDangGui ? <div className="dong-hanh__goi-y">
            <button type="button" onClick={() => { setNoiDung('Mình nên chú ý điều gì ở đây?'); nhapRef.current?.focus(); }}>Mình nên chú ý điều gì?</button>
          </div> : null}
          {[...tinNhan, ...(tinDangGui ? [tinDangGui] : [])].map((item, index) => <div key={index}
            className={'dong-hanh__tin-nhan-muc dong-hanh__tin-nhan-muc--' + item.role} data-nhan-vat={item.character}>
            <b>{item.role === 'assistant' ? ten(item.character!) : s.tenNguoiChoi || 'Bạn'}
              {item.role === 'user' && item.target ? <small> · hỏi {ten(item.target)}</small> : null}</b>
            <p><HighlightText text={item.content} /></p>
          </div>)}
          {dangGui ? <p className="dong-hanh__dang-go" role="status">{ten(dangGui)} đang nghĩ…</p> : null}
        </div>
        {loi ? <p className="dong-hanh__loi" role="alert">{loi}</p> : null}
        <form className="dong-hanh__nhap" onSubmit={gui}>
          <label className="visually-hidden" htmlFor="dong-hanh-cau-hoi">{target ? 'Hỏi ' + ten(target) : 'Nói với bạn đồng hành'}</label>
          <input ref={nhapRef} id="dong-hanh-cau-hoi" value={noiDung} onChange={(event) => setNoiDung(event.target.value)}
            maxLength={600} placeholder={target ? 'Hỏi ' + ten(target) + '…' : ds.length > 1 ? 'Nói với cả nhóm…' : 'Nói với ' + ten(ds[0]!) + '…'} disabled={!!dangGui} />
          <button type="submit" disabled={!!dangGui || !noiDung.trim()}>Nói</button>
        </form>
      </section> : null}
    </aside>
  );
}
