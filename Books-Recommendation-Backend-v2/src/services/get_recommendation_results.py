import redis
import json
import os

async def get_books_from_sorted_set(user_id: str, page=1, page_size=10):
    redis_result_host = os.environ.get("BACKEND_REDIS_REC_RESULTS_HOST")
    redis_result_port = os.environ.get("BACKEND_REDIS_REC_RESULTS_PORT")
    redis_result_pass = os.environ.get("BACKEND_REDIS_REC_RESULTS_PASS")
    
    # Kết nối đến Redis
    # r = redis.Redis(host='redis-14987.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com', port=14987, password="SsgwktV1sE5C4chZ6NwvfsskYRsjdZbb")
    r = redis.Redis(host=redis_result_host, port=redis_result_port, password=redis_result_pass)

    # Lấy các member từ sorted set với key là user_id
    # Lưu ý: Ở đây, ta lấy tất cả các member và score
    # members_with_scores = r.zrevrange(user_id, 0, -1, withscores=True)

    start_index = (page - 1) * page_size
    end_index = start_index + page_size - 1

    members_with_scores = r.zrevrange(user_id, start_index, end_index, withscores=True)

    # Phân tích các member thành dữ liệu sách
    books = []
    for member, score in members_with_scores:
        book_info = json.loads(member)
        books.append({"book_info": book_info, "rec_session_id": score})

    return books
