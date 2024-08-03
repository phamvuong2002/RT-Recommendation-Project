import pickle
import implicit
import numpy as np
import pandas as pd
from src.helpers.load_model import load_model
import scipy.sparse as sparse
from sklearn.metrics.pairwise import cosine_similarity
from src.helpers.load_model import load_model
from src.helpers.load_offline_model import get_latest_model_file



def implicit_rec(user_id, n_similar):
    model = load_model("current/behaviour/implicit_model")
    grouped_df = load_model("current/behaviour/grouped_df")
    # print('innnnn')
    print(grouped_df,user_id)

    # print(grouped_df)
    # data = Dataset.load_from_df(grouped_df[['personId', 'contentId', 'eventStrength']], reader)
    interacted_book = grouped_df.loc[grouped_df['personId']==user_id,'contentId'].unique()
    min_book=5
    if(len(interacted_book)<min_book):
        print('NOT ENOUGH BOOKS')
        return None
    sparse_person_content = sparse.csr_matrix((grouped_df['eventStrength'].astype(float), (grouped_df['person_id'], grouped_df['content_id'])))

    userid = grouped_df.loc[grouped_df['personId']==user_id,'person_id'].values[0]
    # print(userid)
    # filter_already_liked_items: lọc ra các sản phẩm người dùng đã xem có trong tập train
    ids, scores = model.recommend(userid, sparse_person_content[userid], N=n_similar, filter_already_liked_items=True)
    # top_n_recommendations = df[['book_id','score']].sort_values('score',ascending=False).drop_duplicates()[:n_similar]
    
    # final_book= grouped_df.loc[grouped_df['content_id'].isin(ids),'contentId'].unique()
    final_book=[]
    score=[]
    for i in range(len(ids)):
        final_book.append(grouped_df.loc[grouped_df['content_id']==ids[i],'contentId'].iloc[0])
        score.append(scores[i])
        # print(grouped_df_im.loc[grouped_df_im['content_id']==ids[i],'contentId'].iloc[0],ids[i],scores[i])
    
    top_n_recommendations=pd.DataFrame({"book_id":final_book,'score':score})


    final = top_n_recommendations.to_dict('records')
    print("final:::", final)
    return final
