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

    # Đổi id thực của user sang id của model
    converted_user_id = books_df.loc[books_df['User-ID'] == int(user_id),["User_ID"]].drop_duplicates().values[0]
 

    # print('id: ',converted_user_id[0])
    #Sách user đã đánh giá
    u_rated = books_df.loc[books_df['User_ID'] == converted_user_id[0],"Book_ID"].unique()
    # print('rated ',u_rated  )
    #Tất cả sách trong feedback
    all_books = books_df["Book_ID"].unique()
    # print('u not rates: ',all_books)
    # items_not_rated_by_u = books_df[ids, 1].tolist()

    recommended_items = []
    
    for i in range(len(all_books)):
        if(i not in u_rated):
            item={}
            users_rated_i=books_df.loc[books_df['Book_ID'] == i,"User_ID"].unique()
            rating = predict(users_rated_i,pivot_table,similarity_scores,converted_user_id, i)
            if rating > 0:  
                raw_id=books_df.loc[books_df['Book_ID']==i,'Book-ID'].drop_duplicates().iloc[0]
                item['book_id']=raw_id
                item['score']=rating
                recommended_items.append(item)

    
    # print( 'rec',recommended_items)
    # #Convert dictionary to pandas dataframe
    # item_score = pd.DataFrame(item_score.items(),columns=['Book-ID','Book-Score'])

    # #Sort the movies by score
    # ranked_item_score = item_score.sort_values(by='Book-Score',ascending=False)
    # #Select top m movies

    # m=10
    # ranked_item_score.head(m)
    #format: book-book_score
    # converted_list=books_df.loc[books_df['Book_ID'].isin(recommended_items['book-id']),'Book-ID']
    # print(recommended_items['book-id'])
    return recommended_items


    
