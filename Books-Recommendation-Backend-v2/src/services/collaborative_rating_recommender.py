import numpy as np
from src.helpers.load_model import load_model

async def recommendFor(book_name, top=5):
    """
    return top n similar books based on collaborative filtering
    param
        - book_name: name of the book
        - top: number of books to return (default: 5) NOTE : no edge case handling, better to use default value
    """
    pivot_table = load_model("current/rating/pivot_table")
    similarity_scores = load_model("current/rating/similarity_scores")
    books_df = load_model("current/rating/books_df")

    book_name = int(book_name)
    if book_name not in pivot_table.index:
        return []
    index = np.where(pivot_table.index == book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1 : 1 + top]

    books_df["Book-ID"] = books_df["Book-ID"].astype(str)
    results = []
    for i in similar_items:
        item = {}

        temp_df = books_df.loc[books_df["Book-ID"] == str(pivot_table.index[i[0]])]
        item["book_name"] = temp_df["Book-Title"].values[0]
        item["book_id"] = temp_df["Book-ID"].values[0]

        results.append(item)

    return results