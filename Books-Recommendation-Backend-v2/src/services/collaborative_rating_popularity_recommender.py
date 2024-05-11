from src.helpers.load_model import load_model


async def popular_books_top(top: int):
    """
    Return the top popular books.
    param
        - top: number of books to return
    """
    popularity_df = load_model("current/rating/popular")
    MAX_RECOMMENDATIONS = popularity_df.shape[0]

    if top > MAX_RECOMMENDATIONS:
        top = MAX_RECOMMENDATIONS
    elif top < 0:
        top = 0
    df = popularity_df[["Book-ID"]]
    return df.head(top).to_dict(orient="records")
