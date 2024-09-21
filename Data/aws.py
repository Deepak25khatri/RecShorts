from flask import Flask
from Data.config import Config
import pandas as pd
import numpy as np
import boto3
from datetime import datetime, timedelta
from io import BytesIO

app = Flask(__name__)
app.config.from_object(Config)

# for a, b in app.config.items():
#     print(a,b)
# print()
s3_client = boto3.client(
    's3',
    region_name='ap-south-1',
    aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY']
)

bucket_name = app.config['BUCKETNAME']
filename = app.config['FILENAME']



def get_today_data():
    def split_category(category):
        parts = category.split('_', 1)  # Split only once
        if len(parts) == 1:
            return parts[0], ''  # No underscore, sub_category is empty
        else:
            return parts[0], parts[1]
    try:
        now = datetime.now()
        if now.hour < 9:
            today = (now - timedelta(days=1)).strftime('%Y-%m-%d')
        else:
            today = now.strftime('%Y-%m-%d')

        print(bucket_name)
        print(f"{today}/{filename}")
        response = s3_client.get_object(Bucket=bucket_name, Key=f"{today}/{filename}")
        # print(response)
        data = pd.read_csv(response['Body'])
        # Reset the index to make it start from 0 and use it as a column named 'id'
        data.reset_index(inplace=True)
        data.rename(columns={'index': 'id'}, inplace=True)
        data[['main_category', 'sub_category']] = data['Category'].apply(lambda x: pd.Series(split_category(x)))
        return data
    except Exception as e:
        print(e)
        raise

def get_today_matrix():
    try:
        response = s3_client.get_object(Bucket=bucket_name, Key='Tf_Idf/matrix.npz')
        file_stream = response['Body'].read()
        data = BytesIO(file_stream)
        matrix = np.load(data)['X']
        return matrix
    except Exception as e:
        print(e)
        raise

