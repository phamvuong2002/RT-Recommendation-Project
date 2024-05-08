import re
import pickle

books_df = pickle.load(open("models/books_df.pkl", "rb"))
book_names = books_df["Book-Title"].tolist()
book_names_lower = [string.lower() for string in book_names]

def prepare_search_string(search_string: str):
    """
    Prepare search string making a regular expression.
    param
        - search_string: string to search for
    """
    res = search_string.lower() + '*'
    return re.compile(res)

def search_book(search_string: str, top = 10):
    """
    Search for a book by title.
    param
        - search_string: string to search for
        - top: number of books to return (default: 10) NOTE : no edge case handling, better to use default value
    """
    pattern = prepare_search_string(search_string)
    searchable_names = zip(book_names, book_names_lower)


    # results = list(filter(lambda x: re.match(pattern, x[1]), searchable_names))
    # results = [name[0] for name in results][:top]
    # return results

    results = []
    for name, name_lower in searchable_names:
        # Sử dụng biểu thức chính quy để tìm kiếm
        if re.search(pattern, name_lower):
            results.append(name)
        # Số lượng kết quả đạt được
        if len(results) >= top:
            break

    results = list(set(results))
    items = []
    for book in results:
        item = {}
        temp_df = books_df[books_df["Book-Title"] == book]
        item['book_name'] = temp_df['Book-Title'].values[0]
        item['book_id'] = str(temp_df['Book-ID'].values[0])

        items.append(item)

    return items
