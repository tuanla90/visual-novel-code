"""Sync Chrome Profile 1 (nocodeapp.solution@gmail.com) to D:\\Users\\tuanla2\\.chrome_flow
"""
import shutil
import sys
from pathlib import Path

SRC_USER_DATA = Path(r"D:\Users\tuanla2\AppData\Local\Google\Chrome\User Data")
SRC_PROFILE = SRC_USER_DATA / "Profile 1"

DEST_USER_DATA = Path(r"D:\Users\tuanla2\.chrome_flow")
DEST_PROFILE = DEST_USER_DATA / "Default"


def sync_nocodeapp_profile():
    sys.stdout.reconfigure(encoding="utf-8")
    print("=" * 60)
    print("Sao chép phiên đăng nhập Profile 1 (nocodeapp.solution@gmail.com)...")
    print("=" * 60)

    if not SRC_PROFILE.exists():
        print(f"[!] Không tìm thấy: {SRC_PROFILE}")
        return False

    DEST_PROFILE.mkdir(parents=True, exist_ok=True)

    # 1. Local State
    src_local_state = SRC_USER_DATA / "Local State"
    if src_local_state.exists():
        shutil.copy2(src_local_state, DEST_USER_DATA / "Local State")
        print("[✓] Đã sao chép Local State")

    # 2. Critical session items
    items_to_copy = [
        "Network",
        "Local Storage",
        "Sessions",
        "Session Storage",
        "IndexedDB",
        "Login Data",
        "Preferences",
        "Secure Preferences",
        "Web Data",
        "Account Web Data",
    ]

    for item in items_to_copy:
        src_path = SRC_PROFILE / item
        dest_path = DEST_PROFILE / item
        if not src_path.exists():
            continue

        try:
            if src_path.is_dir():
                if dest_path.exists():
                    shutil.rmtree(dest_path, ignore_errors=True)
                shutil.copytree(src_path, dest_path, dirs_exist_ok=True)
            else:
                shutil.copy2(src_path, dest_path)
            print(f"[✓] Đã sao chép: {item}")
        except Exception as e:
            print(f"[-] Bỏ qua {item}: {e}")

    # Remove any stale LOCK
    lock_file = DEST_PROFILE / "LOCK"
    if lock_file.exists():
        try:
            lock_file.unlink()
            print("[✓] Đã xóa stale LOCK file")
        except Exception:
            pass

    print("-" * 60)
    print("[✓] ĐÃ ĐỒNG BỘ THÀNH CÔNG TÀI KHOẢN nocodeapp.solution@gmail.com!")
    return True


if __name__ == "__main__":
    sync_nocodeapp_profile()
