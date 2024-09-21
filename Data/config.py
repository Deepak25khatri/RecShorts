import os
from dotenv import load_dotenv
load_dotenv(override=True)

class Config:
    ENDPOINT = os.getenv("ENDPOINT")
    BUCKETNAME = os.getenv("BUCKETNAME")
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    FILENAME = os.getenv("FILENAME")
