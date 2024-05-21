import os
import re
from typing import Optional

def get_latest_model_file(folder_path: str, model_name: str, model_type: str) -> Optional[str]:
    # Khởi tạo biến để lưu trữ file có timestamp mới nhất
    latest_file = None
    latest_timestamp = -1
    
    # Định dạng pattern để tìm file
    pattern = re.compile(rf"{model_name}_(model_\d+)_{model_type}\.pkl")
    
    # Duyệt qua tất cả các file trong folder
    for file_name in os.listdir(folder_path):
        match = pattern.match(file_name)
        if match:
            # Tách timestamp từ model_id
            model_id = match.group(1)
            timestamp = int(model_id.split('_')[1])
            
            # Kiểm tra và cập nhật nếu timestamp hiện tại mới hơn
            if timestamp > latest_timestamp:
                latest_timestamp = timestamp
                latest_file = file_name
                
    return latest_file