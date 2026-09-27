import { useEffect, useRef, useState } from 'react';
import type { SceneId, PartId } from '../../ids';
import { sceneName } from '../../display-names';
import { soundEngine } from '../../audio/sound-engine';
import './scene-transition.css';

export interface SceneTransitionOverlayProps {
  scene: SceneId;
  part?: PartId | null;
  sequenceId?: string;
}

interface SceneTimeInfo {
  time: string;
  title: string;
  desc: string;
}

function getTimeInfo(scene: SceneId, part?: PartId | null, sequenceId?: string): SceneTimeInfo {
  if (sequenceId === 'intro-00') {
    return {
      time: '08:30 SÁNG',
      title: 'Khuôn viên Đại học Hoa Phượng',
      desc: 'Ánh nắng sớm rọi qua những hàng phượng vĩ trong tuần đầu nhập học.',
    };
  }

  if (part === 'intro') {
    return {
      time: '09:00 SÁNG',
      title: 'Phòng CLB Thám tử Dữ liệu',
      desc: 'Khởi đầu vụ án lá thư nặc danh và nguy cơ mất phòng sinh hoạt.',
    };
  }

  if (part === 'investigation') {
    return {
      time: '10:15 SÁNG',
      title: sceneName(scene),
      desc: scene === 'corridor-b' ? 'Hành lang sảnh trực — Tiếng chổi lau sàn của bác Tư.' : 'Xem xét tài liệu vật chứng tại bàn làm việc.',
    };
  }

  if (part === 'analysis') {
    return {
      time: '14:00 CHIỀU',
      title: 'Phòng CLB: Trích xuất SQL',
      desc: 'Phân tích cơ sở dữ liệu sinh viên để tìm đối tượng nghi vấn.',
    };
  }

  if (part === 'debrief') {
    return {
      time: '16:30 CHIỀU',
      title: 'Phòng Giải trình CTSV',
      desc: 'Buổi đối chất trực tiếp trước đại diện Ban Quản trị nhà trường.',
    };
  }

  if (part === 'ending') {
    return {
      time: '17:45 HOÀNG HÔN',
      title: 'Phòng CLB Thám tử Dữ liệu',
      desc: 'Ánh chiều tà chiếu qua khung cửa sổ. Danh dự của CLB đã được bảo vệ.',
    };
  }

  return {
    time: 'TRƯỜNG ĐH HOA PHƯỢNG',
    title: sceneName(scene),
    desc: 'Điều tra dữ liệu và tìm kiếm sự thật.',
  };
}

export function SceneTransitionOverlay({ scene, part, sequenceId }: SceneTransitionOverlayProps) {
  const prevKeyRef = useRef<string>(`${scene}-${part}`);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nextKey = `${scene}-${part}`;
    if (nextKey !== prevKeyRef.current) {
      prevKeyRef.current = nextKey;
      soundEngine.playSfx('page');
      const showTimer = setTimeout(() => setVisible(true), 0);
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 1600);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [scene, part]);

  if (!visible) return null;

  const info = getTimeInfo(scene, part, sequenceId);

  return (
    <div className="scene-trans" aria-hidden="true">
      <div className="scene-trans__content">
        <div className="scene-trans__time">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {info.time}
        </div>
        <h2 className="scene-trans__title">{info.title}</h2>
        <div className="scene-trans__line" />
        <p className="scene-trans__desc">{info.desc}</p>
      </div>
    </div>
  );
}
