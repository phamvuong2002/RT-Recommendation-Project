import pandas as pd
import numpy as np



def predict(users_rated_i,pivot_data, similarity_score,u, i,k_neighbors):
        # """ 
        # predict the rating of user u for item i (normalized)
        # if you need the un
        # """
    # Step 1: find all users who rated i
    k=k_neighbors
    if(len(users_rated_i)<k_neighbors):
        k=len(users_rated_i)
    # users_rated_i = rating_data.loc[rating_data['Book_ID'] == i,"User_ID"].unique()
    

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
    
    # Tử số
    numerator=(r*nearest_s).sum()
    # Mẫu số
    denominator=(np.abs(nearest_s).sum())

    # Nếu tử = 0 / mẫu = 0 --> trả về -5 
    if( numerator==0 or denominator==0):
        return -5

    result=np.dot(r,nearest_s)/(np.abs(nearest_s).sum()) 
    # công thức dưới cùng ra kết quả tương tự
    # result=(r*nearest_s).sum()/(np.abs(nearest_s).sum()) 

    return result
    
    

