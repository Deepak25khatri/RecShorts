from flask import Flask, request, Response, jsonify
from Data.news import df, search_articles_by_query, recommend_articles, scheduled_job
from flask_cors import CORS
import pandas as pd
from datetime import datetime, timedelta
import json
from pytz import timezone
from apscheduler.schedulers.background import BackgroundScheduler

# Set up the scheduler with the timezone
scheduler = BackgroundScheduler(timezone=timezone('Asia/Kolkata'))
# Schedule the job to run daily at 9 AM IST
scheduler.add_job(scheduled_job, 'cron', hour=9, minute=0)
scheduler.start()

application = Flask(__name__)
app=application
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/getall')
def getall():
    result = df.groupby('main_category', group_keys=False).apply(
    lambda x: x.sort_values('Publication Date', ascending=False).head(20).to_dict(orient='records')
).reset_index(name='news')
    result.rename(columns={'main_category': 'category_name'}, inplace=True)
    
    recent_news = df.sort_values('Publication Date', ascending=False).head(20).to_dict(orient='records')
    
    recent_df = pd.DataFrame({
        'category_name': ['recent'],
        'news': [recent_news]
    })
    
    final_result = pd.concat([ recent_df, result], ignore_index=True)
    
    json_str = final_result.to_json(orient='records')
    
    return Response(json_str, mimetype='application/json')

@app.route('/search')
def search():
    query = request.args.get('query', '')  # Get the search query from the URL parameters
    results_df = search_articles_by_query(query, num_recommendations=5)
    results_json = results_df.to_json(orient='records')
    return Response(results_json, mimetype='application/json')

@app.route('/recommend')
def recommend():
    query = request.args.get('query', '')  # Get the search query from the URL parameter
    try:
        query = int(query)
    except ValueError:
        return jsonify({"error": "Invalid query parameter. It must be an integer."}), 400

    results_df = recommend_articles(query, num_recommendations=5)
    # print(results_df)
    results_json = results_df.to_json(orient='records')
    return Response(results_json, mimetype='application/json')

@app.route('/test')
def test():
    results_json =json.dumps({"n":datetime.now().hour})
    print("hello")
    return Response(results_json, mimetype='application/json')
    # df

if __name__ == '__main__':
    print("hello")
    app.run(host='0.0.0.0', port=8080)
