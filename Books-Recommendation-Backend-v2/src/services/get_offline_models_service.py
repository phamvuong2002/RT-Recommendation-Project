import boto3
import os

def get_offline_models(model_name=None, location=None):
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
        aws_secret_access_key=os.environ.get("S3_SECRET_ACCESS_KEY"),
        region_name=os.environ.get("S3_REGION_NAME")
    )
    bucket_name = os.environ.get("S3_BUCKET_NAME")

    try:
        # Lấy đối tượng từ S3
        response = s3.get_object(Bucket=bucket_name, Key=model_name)
        content = response['Body'].read()

        file_path = os.path.join(f"src/models/offline/{location}", model_name)
        # Lưu nội dung vào tệp đích
        with open(file_path, 'wb') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f'Lỗi khi tải {model_name} từ S3: {e}')
        return False
