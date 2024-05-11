import os
import pickle

def load_model(model_name):
    """
    Load a model from a pickle file.
    Args:
        model_name (str): The name of the model to load.
    Returns:
        model: The loaded model object.
    """
    # Lấy đường dẫn tuyệt đối của thư mục chứa file hiện tại
    current_dir = os.path.abspath(os.path.dirname(__file__))

    # Tạo đường dẫn tuyệt đối đến tệp pickle của model
    model_pkl_path = os.path.join(current_dir, '..', 'models', f'{model_name}.pkl')

    # Kiểm tra xem tệp tồn tại không
    if not os.path.exists(model_pkl_path):
        raise FileNotFoundError(f"Model file {model_name}.pkl not found.")

    # Load dữ liệu từ tệp pickle
    with open(model_pkl_path, "rb") as f:
        model = pickle.load(f)

    return model