import os
import shutil

# Cấu hình
BACKUP_DIR = "backup_html"
NEW_SCRIPT_TAG = '<script src="main.js"></script>'
TARGET_FILES = [f for f in os.listdir('.') if f.endswith('.html')]

# Chuỗi nhận diện đoạn code cũ (đoạn đầu của script inline)
# Dùng chuỗi ngắn này để xác định vị trí bắt đầu
START_MARKER = 'const body=document.body,btn=document.querySelector(".theme-btn");'

def create_backup():
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR)
    for file in TARGET_FILES:
        shutil.copy2(file, os.path.join(BACKUP_DIR, file))
    print(f"✅ Đã sao lưu toàn bộ file HTML vào thư mục '{BACKUP_DIR}'")

def update_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Kiểm tra xem đã update chưa
    if 'src="main.js"' in content:
        print(f"⏭️  Bỏ qua {filename} (Đã có main.js)")
        return

    # Tìm vị trí bắt đầu của đoạn script cũ
    start_index = content.find(START_MARKER)
    
    if start_index != -1:
        # Tìm thẻ <script> bao quanh đoạn code này
        # Lùi lại để tìm <script> mở
        script_open_tag = content.rfind('<script>', 0, start_index)
        # Tìm thẻ </script> đóng
        script_close_tag = content.find('</script>', start_index)

        if script_open_tag != -1 and script_close_tag != -1:
            # Xác định toàn bộ khối code cũ
            old_block = content[script_open_tag:script_close_tag + 9] # +9 để lấy cả </script>
            
            # Thay thế bằng thẻ mới
            new_content = content.replace(old_block, NEW_SCRIPT_TAG)
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Đã cập nhật: {filename}")
        else:
            print(f"⚠️  Không tìm thấy thẻ đóng/mở script trong {filename}")
    else:
        print(f"❌ Không tìm thấy đoạn code cũ trong {filename}")

def main():
    print("--- BẮT ĐẦU TỰ ĐỘNG HÓA ---")
    create_backup()
    
    # Danh sách các file cần xử lý thủ công (do có logic riêng biệt)
    manual_files = ['contact.html', 'project-brochure.html']
    
    for filename in TARGET_FILES:
        if filename in manual_files:
            print(f"⚠️  Vui lòng sửa tay file: {filename} (Chứa logic form/book riêng)")
            continue
            
        update_file(filename)

    print("\n--- HOÀN TẤT ---")
    print("Vui lòng kiểm tra lại các file trong trình duyệt.")

if __name__ == "__main__":
    main()