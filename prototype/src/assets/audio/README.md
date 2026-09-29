# Thư mục Âm thanh (Audio Assets)

Bạn có thể thêm các tệp âm thanh thực tế (`.mp3`, `.ogg`, `.wav`) vào các thư mục tương ứng:

- `bgm/`: Chứa các bản nhạc nền. Ví dụ: `main-theme.mp3`, `investigation.mp3`.
- `sfx/`: Chứa các tệp hiệu ứng âm thanh. Ví dụ: `click.mp3`, `page.mp3`, `chime.mp3`.

Hệ thống `SoundEngine` (`src/shared/audio/sound-engine.ts`) sẽ tự động phát hiện và ưu tiên phát tệp thực tế khi có, hoặc tự động fallback về bộ tổng hợp âm thanh Web Audio API Synthesizer nếu chưa có tệp.
