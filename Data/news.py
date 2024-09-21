from Data.aws import get_today_data, get_today_matrix
from sklearn.metrics.pairwise import cosine_similarity

df = get_today_data()

matrix = get_today_matrix()

def search_articles_by_query(query, num_recommendations=5):
    query = query.lower()
    matched_articles = df[df['Keyphrases'].str.contains(query, case=False, na=False)]
    if len(matched_articles) > num_recommendations:
        matched_articles = matched_articles.head(num_recommendations)
    return matched_articles

def recommend_articles(article_index, num_recommendations=5):
    article_vector = matrix[article_index].reshape(1, -1)
    similarities = cosine_similarity(article_vector, matrix)
    similar_indices = similarities.argsort()[0][-num_recommendations-1:-1][::-1]
    return df.iloc[similar_indices]

def scheduled_job():
    global matrix
    print("Fetching the matrix...")
    matrix = get_today_matrix()
    print("Matrix fetched successfully.")