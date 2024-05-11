import os
import shutil

def move_files(source_directory, destination_directory):
    # Xoá tất cả các tệp trong thư mục đích (nếu có)
    for filename in os.listdir(destination_directory):
        file_path = os.path.join(destination_directory, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f"Không thể xoá {file_path}: {e}")

    # Lấy danh sách tất cả các tệp trong thư mục nguồn
    files = os.listdir(source_directory)

    # Duyệt qua từng tệp và di chuyển chúng sang thư mục đích
    for file in files:
        source_path = os.path.join(source_directory, file)
        destination_path = os.path.join(destination_directory, file)
        shutil.move(source_path, destination_path)

    print("Tất cả các tệp đã được di chuyển thành công.")
