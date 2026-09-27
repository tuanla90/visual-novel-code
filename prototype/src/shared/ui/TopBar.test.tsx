import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TopBar } from './TopBar';

describe('TopBar - visual novel HUD', () => {
  it('keeps chapter, objective and dossier visible while replay stays in the pause menu', () => {
    const onToggleNotebook = vi.fn();
    render(
      <TopBar
        currentPart="investigation"
        completedParts={[]}
        task="Tìm nguồn của lá thư"
        notebookCount={3}
        notebookOpen={false}
        onToggleNotebook={onToggleNotebook}
        onReset={() => {}}
        isSample={false}
      />,
    );

    expect(screen.getByText('Tìm nguồn của lá thư')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mở hồ sơ vật chứng' })).toBeInTheDocument();
    const menu = screen.getByLabelText('Mở menu tạm dừng').closest('details');
    expect(menu).not.toHaveAttribute('open');

    fireEvent.click(screen.getByLabelText('Mở menu tạm dừng'));
    expect(menu).toHaveAttribute('open');
    expect(screen.getByRole('button', { name: 'Chơi lại từ đầu' })).toBeInTheDocument();
  });
});
