import pickle
import numpy as np
from src.helpers.load_model import load_model
from src.helpers.predict_rating import predict
import pandas as pd


## recommendations based on user_id
# RATING?
def rating_user(user_id, n_similar):
    pivot_table = load_model("current/rating-user/pivot_table")
    similarity_scores = load_model("current/rating-user/similarity_scores")
    books_df = load_model("current/rating-user/books_df")
    # distances = load_model("current/rating-user/distances")
    # neighbors = load_model("current/rating-user/indices")
 
    # Đổi id thực của user sang id của model
    # converted_user_id = books_df.loc[books_df['User-ID'] == user_id,["User-ID"]].drop_duplicates().values[0]
    converted_user_id = books_df.loc[books_df['User-ID'] == user_id,["User_ID"]].drop_duplicates().values[0]

    # print('id: ',converted_user_id[0])
    # print(books_df.sort_values('User_ID'))
    #Sách user đã đánh giá
    # u_rated = books_df.loc[books_df['User_ID'] == converted_user_id[0],"Book_ID"].unique()
    # print('rated ',u_rated  )
    #Tất cả sách trong feedback
    # all_books = books_df["Book_ID"].unique()
    # print('nei: ',distances)
    # print('nnnei',neighbors)
    # items_not_rated_by_u = books_df[ids, 1].tolist()

    recommended_items = []
    #find candidates book - get top 30
    # user_neighbors = neighbors[converted_user_id[0]]
    # top 5 neighbor --> get top 30 item
    user_neighbors = similarity_scores[converted_user_id[0]]
    a = (-user_neighbors).argsort()[:6]
   
    activities = books_df.loc[books_df['User_ID'].isin(a.reshape(-1))]
   
    frequency = activities.groupby('Book_ID')['Book-Rating'].count().reset_index(name='count').sort_values(['count'],ascending=False)
    # print('f',frequency)
    Gu_items = frequency['Book_ID']
    active_items = books_df.loc[books_df['User_ID'] == converted_user_id[0]]['Book_ID'].to_list()
    # print(active_items)
    #candidate book - top 30
    candidates = np.setdiff1d(Gu_items, active_items, assume_unique=True)[:30]
    # print('can',candidates)
    
    # for i in range(len(all_books)):
    #     if(i not in u_rated):
    #         item={}
    #         users_rated_i=books_df.loc[books_df['Book_ID'] == i,"User_ID"].unique()
    #         print(users_rated_i)
    #         rating = predict(users_rated_i,pivot_table,similarity_scores,converted_user_id, i)
    #         if rating > 0:  
    #             raw_id=books_df.loc[books_df['Book_ID']==i,'Book-ID'].drop_duplicates().iloc[0]
    #             item['book_id']=raw_id
    #             item['score']=rating
    #             recommended_items.append(item)
    for i in range(len(candidates)):
        print(candidates[i])
        item={}
        users_rated_i=books_df.loc[(books_df['Book_ID'] == candidates[i]) & (books_df['Book-Rating']>0),"User_ID"].unique()
        print('u',users_rated_i)
        if(users_rated_i is None or len(users_rated_i)==0): 
            print('none',users_rated_i)
            continue
        else:
            rating = predict(users_rated_i,pivot_table,similarity_scores,converted_user_id, candidates[i])
            if rating > 0:  
                raw_id=books_df.loc[books_df['Book_ID']==candidates[i],'Book-ID'].drop_duplicates().iloc[0]
                item['book_id']=raw_id
                item['score']=rating
                recommended_items.append(item)

  
    return recommended_items[:n_similar]


    
