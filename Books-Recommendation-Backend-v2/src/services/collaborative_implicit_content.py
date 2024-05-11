import pickle
import numpy as np
from src.helpers.load_model import load_model


## recommendations based on content_id
def implicit_content(content_id, n_similar):
    model = load_model("current/behaviour/implicit_model")
    grouped_df = load_model("current/behaviour/grouped_df")

    # Đổi id thực của sách sang id của model
    content_id  = int(grouped_df.content_id.loc[grouped_df.contentId == str(content_id)].iloc[0])

    # content_vecs = model.user_factors
    content_vecs = model.item_factors

    content_norms = np.sqrt((content_vecs * content_vecs).sum(axis=1))

    scores = content_vecs.dot(content_vecs[content_id]) / content_norms
    top_idx = np.argpartition(scores, -n_similar)[-n_similar:]
    similar = sorted(zip(top_idx, scores[top_idx] / content_norms[content_id]), key=lambda x: -x[1])

    result = [{'bookID': str(grouped_df.contentId.loc[grouped_df.content_id == content_id].iloc[0]), 'score': str(100)}]
    for content in similar:
        idx, score = content
        result.append({'bookID': str(grouped_df.contentId.loc[grouped_df.content_id == idx].iloc[0]), 'score': str(score)})

    return result
