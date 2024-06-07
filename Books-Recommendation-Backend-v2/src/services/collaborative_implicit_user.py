import pickle
import numpy as np
import pandas as pd
from src.helpers.load_model import load_model
import scipy.sparse as sparse
from sklearn.metrics.pairwise import cosine_similarity
import operator
## 

k=2
def implicit_user(user_id, n_similar): 
    model = load_model("current/behaviour/implicit_model")
    grouped_df = load_model("current/behaviour/grouped_df")
    # print(n_similar)
    # print(grouped_df)
    # Đổi id thực của sách sang id của model
    # user_id  = int(grouped_df.person_id.loc[grouped_df.person_id == str(user_id),'person_id'].iloc[0])
    converted_user_id = grouped_df.loc[grouped_df['personId'] == user_id,["person_id"]].drop_duplicates().values[0]
    
    #sách đã rating - tất cả sách
    u_rated = grouped_df.loc[grouped_df['person_id'] == converted_user_id[0],"content_id"].unique()
    # all_books=grouped_df['content_id'].unique()
    all_books=grouped_df[['content_id','contentId']].drop_duplicates()
    # print(all_books)
  
    sparse_person_content = sparse.csr_matrix((grouped_df['eventStrength'].astype(float), (grouped_df['person_id'], grouped_df['content_id']))).todense()
    # print(sparse_person_content.todense())
    user_latent_factor = model.user_factors
    
    # print(user_latent_factor)
    # similarity_scores=pd.DataFrame.from_dict(result)
    recommended_items = []
    similarity_score = cosine_similarity(user_latent_factor)

    # tính weight của user -> rating phim
    for i in range(len(all_books)):
        if(i not in u_rated):
            item={}
            #user đã tương tác item-I
            users_rated_i= grouped_df.loc[grouped_df['content_id'] == i,"person_id"].unique()
            sim = similarity_score[converted_user_id, users_rated_i]
            a = (-sim).argsort()[:k]
            # print(a)
            # print(sim[a])
            nearest_s = sim[a]
            # How did each of 'near' users rated item i
            r = sparse_person_content[users_rated_i[a],i]
            # print('i, r',i,r) 
            # rating = predict(users_rated_i,sparse_person_content,similarities,converted_user_id, i)
            rating=(r*nearest_s).sum()/(np.abs(nearest_s).sum()) 
            if rating > 0:  
                raw_id=all_books.loc[all_books['content_id']==i,'contentId'].iloc[0]
                item['book_id']=raw_id
                item['score']=rating
                recommended_items.append(item)

    # print(recommended_items)
    result = sorted(recommended_items, key=operator.itemgetter('score'), reverse=True)
    # print(result[:n_similar])
    # print(result)
    # for content in similar_users:
    #     idx, score = content
    #     result.append({'bookID': str(grouped_df.contentId.loc[grouped_df.content_id == idx].iloc[0]), 'score': str(score)})

    return result[:n_similar]
