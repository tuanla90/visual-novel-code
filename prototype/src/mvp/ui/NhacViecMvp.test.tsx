import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { NhacViecMvp } from './NhacViecMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

describe('NhacViecMvp — Việc đang làm do nhân vật nhắc', () => {
  it('hiển thị đúng tên nhân vật và câu nhắc kèm data-nhan-vat cho avatar', () => {
    const { container } = render(
      <NhacViecMvp
        kb={kb}
        nhac={{
          nhanVat: 'minh-anh',
          text: 'Bảy giờ tối thứ Ba, sân ký túc xá. Nhớ tới ăn bánh.',
          bieuCam: 'neutral',
        }}
        dienTen={(t) => t}
      />
    );

    const aside = container.querySelector('.nhac-viec');
    expect(aside).toHaveAttribute('data-nhan-vat', 'minh-anh');
    expect(screen.getByText('Minh Anh')).toBeInTheDocument();
    expect(screen.getByText('Bảy giờ tối thứ Ba, sân ký túc xá. Nhớ tới ăn bánh.')).toBeInTheDocument();

    const mat = container.querySelector('.nhac-viec__mat');
    expect(mat).toHaveAttribute('data-nhan-vat', 'minh-anh');
    const img = mat?.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('nhân vật người chơi thì dùng tên người chơi hoặc "Bạn"', () => {
    const { container } = render(
      <NhacViecMvp
        kb={kb}
        nhac={{
          nhanVat: 'player',
          text: 'Mình nên kiểm tra lại danh sách.',
        }}
        dienTen={(t) => t}
        tenNguoiChoi="An"
      />
    );

    expect(screen.getByText('An')).toBeInTheDocument();
    expect(container.querySelector('.nhac-viec')).toHaveAttribute('data-nhan-vat', 'player');
  });

  it('bấm hoặc gõ Enter để mở rộng / thu gọn bong bóng nhắc việc', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <NhacViecMvp
        kb={kb}
        nhac={{
          nhanVat: 'ha-vy',
          text: 'Khoan đã, hãy xem lại hồ sơ.',
        }}
        dienTen={(t) => t}
      />
    );

    const aside = container.querySelector('.nhac-viec') as HTMLElement;
    expect(aside).not.toHaveClass('is-expanded');

    await user.click(aside);
    expect(aside).toHaveClass('is-expanded');

    await user.keyboard('{Enter}');
    expect(aside).not.toHaveClass('is-expanded');
  });
});
