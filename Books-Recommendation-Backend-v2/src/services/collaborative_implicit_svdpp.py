import pickle
import numpy as np
import pandas as pd
from src.helpers.load_model import load_model
import scipy.sparse as sparse
from sklearn.metrics.pairwise import cosine_similarity
from src.helpers.load_model import load_model
from src.helpers.load_offline_model import get_latest_model_file

k=2
def implicit_svdpp(user_id, n_similar): 
    grouped_df=load_model("current/behaviour-svd/grouped_df")
    algo_pp=load_model("current/behaviour-svd/algo_pp")
    # data = Dataset.load_from_df(grouped_df[['personId', 'contentId', 'eventStrength']], reader)
    interacted_book = grouped_df.loc[grouped_df['personId']==user_id,'contentId'].unique()

    list_of_unrated_book = grouped_df.loc[(grouped_df['personId']==user_id,['contentId']) and (~grouped_df['contentId'].isin(interacted_book)),'contentId']

    # set up user set with unrated books
    print('unrated ',list_of_unrated_book)
    user_set = [[user_id, item_id, 0] for item_id in list_of_unrated_book]


    # generate predictions based on user set
    predictions_pp= algo_pp.test(user_set)
    
    df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
    print('PRE',df.sort_values('est',ascending=False).drop_duplicates('iid'),['iid','est'])
    df=df.rename(columns={'iid': 'book_id', 'est': 'score'})
    top_n_recommendations = df[['book_id','score']].sort_values('score',ascending=False).drop_duplicates()[:n_similar]
    

    final = top_n_recommendations.to_dict('records')
    print(final)
    return final

def implicit_offline_svdpp(user_id, n_similar): 
    model_name = get_latest_model_file(folder_path="src/models/offline/behaviour_svd", model_name="svd", model_type="behaviour_svd")
    grouped_df_name = get_latest_model_file(folder_path="src/models/offline/behaviour_svd", model_name="grouped_df", model_type="behaviour_svd")
    print(model_name)
    print(grouped_df_name)
    model_name = model_name.split('.')[0]
    grouped_df_name = grouped_df_name.split('.')[0]

    algo_pp = load_model(f"offline/behaviour_svd/{model_name}")
    grouped_df = load_model(f"offline/behaviour_svd/{grouped_df_name}")
    
    # grouped_df=load_model("current/behaviour-svd/grouped_df")
    # algo_pp=load_model("current/behaviour-svd/algo_pp")
    # data = Dataset.load_from_df(grouped_df[['personId', 'contentId', 'eventStrength']], reader)
    interacted_book = grouped_df.loc[grouped_df['personId']==user_id,'contentId'].unique()

    list_of_unrated_book = grouped_df.loc[(grouped_df['personId']==user_id,['contentId']) and (~grouped_df['contentId'].isin(interacted_book)),'contentId']

    # set up user set with unrated books
    print('unrated ',list_of_unrated_book)
    user_set = [[user_id, item_id, 0] for item_id in list_of_unrated_book]


    # generate predictions based on user set
    predictions_pp= algo_pp.test(user_set)
    
    df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
    # print('PRE',df.sort_values('est',ascending=False).drop_duplicates('iid'),['iid','est'])
    df=df.rename(columns={'iid': 'book_id', 'est': 'score'})
    top_n_recommendations = df[['book_id','score']].sort_values('score',ascending=False).drop_duplicates('book_id')[:n_similar]
    

    final = top_n_recommendations.to_dict('records')
  
    return final
