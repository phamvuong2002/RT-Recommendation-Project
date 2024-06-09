import pickle
import numpy as np
from src.helpers.predict_rating import predict
import pandas as pd

from src.helpers.load_model import load_model
from src.helpers.load_offline_model import get_latest_model_file
import operator
## recommendations based on user_id
# RATING?
k_neighbors=5
def rating_user(user_id, n_similar):
    pivot_table = load_model("current/rating-user/pivot_table")
    similarity_scores = load_model("current/rating-user/similarity_scores")
    books_df = load_model("current/rating-user/books_df")
    mean_rating = load_model("current/rating-user/mean_rating")
   
    # print(pi)
    # print(similarity_scores)
    print((mean_rating))
    # Đổi id thực của user sang id của model
    # converted_user_id = books_df.loc[books_df['User-ID'] == user_id,["User-ID"]].drop_duplicates().values[0]
    converted_user_id = books_df.loc[books_df['User-ID'] == user_id,["User_ID"]].drop_duplicates().values[0]
    # print(pivot_table)
    # print((type(converted_user_id)),converted_user_id[0])
    #find candidates book - get top 30
    # user_neighbors = neighbors[converted_user_id[0]]
    # top 5 neighbor --> get top 30 item
    user_neighbors = similarity_scores[converted_user_id[0]]
    a = (-user_neighbors).argsort()[:k_neighbors]
   
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
    # recommended_items = pd.DataFrame(columns=['book_id','score'])
    recommended_items=[]
    user_mean_r=mean_rating.loc[mean_rating['User_ID']==converted_user_id[0],'Book-Rating'].values[0]
    
    rated_book = books_df.loc[books_df['User-ID']==user_id,'Book_ID'].unique()

    list_of_unrated_book = books_df.loc[(books_df['User-ID']==user_id,['Book_ID']) and (~books_df['Book-ID'].isin(rated_book)),'Book_ID'].drop_duplicates()
   
    unrated_books=list_of_unrated_book.to_numpy()
    # print(type(unrated_books))
    # print((unrated_books))
    for i in range(len(unrated_books)):
        item={}
        users_rated_i=books_df.loc[(books_df['Book_ID'] == unrated_books[i]) & (books_df['Book-Rating']>0),"User_ID"].unique()
        if(users_rated_i is None or len(users_rated_i)==0): 
            continue
        else:
            rating = predict(users_rated_i,pivot_table,similarity_scores,converted_user_id[0], unrated_books[i],k_neighbors)
            final_r=rating+user_mean_r
            if final_r > 3:  
                raw_id=books_df.loc[books_df['Book_ID']==unrated_books[i],'Book-ID'].iloc[0]
                item['book_id']=str(raw_id)
                item['score']=final_r
                recommended_items.append(item)
            final_r=0

    
    result = sorted(recommended_items, key=operator.itemgetter('score'), reverse=True)
    # print(result)
    return result[:n_similar]



def rating_offline_user(user_id, n_similar):
    model_name = get_latest_model_file(folder_path="src/models/offline/rating_user", model_name="knn", model_type="rating_user")
    grouped_df_name = get_latest_model_file(folder_path="src/models/offline/rating_user", model_name="grouped_df", model_type="rating_user")
    
    model_name = model_name.split('.')[0]
    grouped_df_name = grouped_df_name.split('.')[0]

    algo_knn = load_model(f"offline/rating_user/{model_name}")
    grouped_df = load_model(f"offline/rating_user/{grouped_df_name}")
    # Creating an user item interactions matrix 
    # user_item_interactions_matrix = grouped_df.pivot(index = 'User-ID', columns = 'Book-ID', values = 'Book-Rating')
    
    # # Extracting those product ids which the user_id has not interacted yet
    # non_interacted_products = user_item_interactions_matrix.loc[user_id][user_item_interactions_matrix.loc[user_id].isnull()].index.tolist()
    
    # # Looping through each of the product ids which user_id has not interacted yet
    # for item_id in non_interacted_products:
        
    #     # Predicting the ratings for those non interacted product ids by this user
    #     est = algo_knn.predict(user_id, item_id).est
        
    #     # Appending the predicted ratings
    #     recommendations.append((item_id, est))

    # # Sorting the predicted ratings in descending order
    # recommendations.sort(key = lambda x: x[1], reverse = True)
    rated_book = grouped_df.loc[grouped_df['User-ID']==user_id,'Book-ID'].unique()

    list_of_unrated_book = grouped_df.loc[(grouped_df['User-ID']==user_id,['Book-ID']) and (~grouped_df['Book-ID'].isin(rated_book)),'Book-ID']

    # set up user set with unrated books
    # print('unrated ',list_of_unrated_book) 
    user_set = [[user_id, item_id, 0] for item_id in list_of_unrated_book]


    # generate predictions based on user set
    predictions_pp= algo_knn.test(user_set)
    
    df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
    # print('PRE',df.sort_values('est',ascending=False).drop_duplicates('iid'),['iid','est'])
    df=df.rename(columns={'iid': 'book_id', 'est': 'score'})
    top_n_recommendations = df[['book_id','score']].sort_values('score',ascending=False).drop_duplicates('book_id')[:n_similar]
    

    final = top_n_recommendations.to_dict('records')

    return final # Returing top n highest predicted rating products for this user

    
