import numpy as np
import pandas as pd
from src.helpers.load_model import load_model



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
