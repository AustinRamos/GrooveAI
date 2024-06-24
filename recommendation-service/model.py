import pandas as pd
from sklearn.neighbors import NearestNeighbors

data = {
    'user': ['A', 'B', 'C', 'D'],
    'item': ['X', 'Y', 'Z', 'W'],
    'rating': [5, 4, 3, 4]
}

df = pd.DataFrame(data)
item_user_matrix = df.pivot_table(index='item', columns='user', values='rating').fillna(0)
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(item_user_matrix.values)

def recommend_items(item_id, n=2):
    item_index = item_user_matrix.index.tolist().index(item_id)
    distances, indices = model.kneighbors([item_user_matrix.iloc[item_index]], n_neighbors=n+1)
    return item_user_matrix.index[indices.flatten()].tolist()[1:]
