import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from src.helpers.load_model import load_model
from src.helpers.load_offline_model import get_latest_model_file


k=2
def rating_svdpp(user_id, n_similar): 
    grouped_df=load_model("current/rating-svd/grouped_df")
    algo_pp=load_model("current/rating-svd/algo_pp")

    rated_book = grouped_df.loc[grouped_df['User-ID']==user_id,'Book-ID'].unique()

    list_of_unrated_book = grouped_df.loc[(grouped_df['User-ID']==user_id,['Book-ID']) and (~grouped_df['Book-ID'].isin(rated_book)),'Book-ID']

    # set up user set with unrated books
    # print('unrated ',list_of_unrated_book) 
    user_set = [[user_id, item_id, 0] for item_id in list_of_unrated_book]


    # generate predictions based on user set
    predictions_pp= algo_pp.test(user_set)
    
    df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
    # print('PRE',df.sort_values('est',ascending=False).drop_duplicates('iid'),['iid','est'])
    df=df.rename(columns={'iid': 'book_id', 'est': 'score'})
    top_n_recommendations = df[['book_id','score']].sort_values('score',ascending=False).drop_duplicates('book_id')[:n_similar]
    

    final = top_n_recommendations.to_dict('records')
  
    return final


def rating_offline_svdpp(user_id, n_similar): 
    model_name = get_latest_model_file(folder_path="src/models/offline/rating_svd", model_name="svd", model_type="rating_svd")
    grouped_df_name = get_latest_model_file(folder_path="src/models/offline/rating_svd", model_name="grouped_df", model_type="rating_svd")
    print('in off')
    print(model_name)
    print(grouped_df_name)
    model_name = model_name.split('.')[0]
    grouped_df_name = grouped_df_name.split('.')[0]

    algo_pp = load_model(f"offline/rating_svd/{model_name}")
    grouped_df = load_model(f"offline/rating_svd/{grouped_df_name}")
  

    rated_book = grouped_df.loc[grouped_df['User-ID']==user_id,'Book-ID'].unique()

    list_of_unrated_book = grouped_df.loc[(grouped_df['User-ID']==user_id,['Book-ID']) and (~grouped_df['Book-ID'].isin(rated_book)),'Book-ID']

    # set up user set with unrated books
    # print('unrated ',list_of_unrated_book) 
    user_set = [[user_id, item_id, 0] for item_id in list_of_unrated_book]


    # generate predictions based on user set
    predictions_pp= algo_pp.test(user_set)
    
    df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
    # print('PRE',df.sort_values('est',ascending=False).drop_duplicates('iid'),['iid','est'])
    df=df.rename(columns={'iid': 'book_id', 'est': 'score'})
    top_n_recommendations = df[['book_id','score']].sort_values('score',ascending=False).drop_duplicates('book_id')[:n_similar]
    

    final = top_n_recommendations.to_dict('records')
  
    return final
