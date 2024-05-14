import pandas as pd
import numpy as np


def predict(users_rated_i,pivot_data, similarity_score,u, i, k=2):
        # """ 
        # predict the rating of user u for item i (normalized)
        # if you need the un
        # """
    # Step 1: find all users who rated i
    # print(similarity_score)
    # print(pivot_data)
    # users_rated_i = rating_data.loc[rating_data['Book_ID'] == i,"User_ID"].unique()
    print((users_rated_i))
    
    # Step 2: find similarity btw the current user and others 
    # who already rated i   [current user - users rated i]
    sim = similarity_score[u, users_rated_i]
    
    # Step 3: find the k most similarity users
    a = (-sim).argsort()[:k]
        # and the corresponding similarity levels
    nearest_s = sim[a]
   
    # How did each of 'near' users rated item i
    r = pivot_data.loc[users_rated_i[a],i]
  
    #Dự đoán rating cho item i = tổng[rating của user * độ tương đồng)]/ tổng độ tương đồng
    # print('tu ',(r*nearest_s).sum())
    result=(r*nearest_s).sum()/(np.abs(nearest_s).sum()) 
    # print('sim ',sim)   
    # print('sap xep lai ',a) 
    # print('sim[a] ',sim[a]) 
    # print(users_rated_i[a])
    # print('r ',r)
    # print(result)
    return result
    
    

