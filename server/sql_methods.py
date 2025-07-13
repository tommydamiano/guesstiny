import pymysql
from pymysql.cursors import DictCursor
from dbutils.pooled_db import PooledDB

db_config = {}

# Create connection pool
connection_pool = PooledDB(
    creator=pymysql,
    maxconnections=10,     # Maximum number of connections
    mincached=2,           # Minimum number of cached connections
    maxcached=5,           # Maximum number of cached connections
    maxshared=3,           # Maximum number of shared connections
    blocking=True,         # Block when no connections available
    maxusage=None,         # Number of reuses of a single connection
    setsession=[],         # List of SQL commands to execute on connection
    **db_config
)

def get_country_list():
    db = connection_pool.connection()
    try:
        cursor = db.cursor()
        query = """SELECT pk, name, population, is_state, pic_url 
                   FROM countries 
                   ORDER BY RAND()"""
        cursor.execute(query)
        results = cursor.fetchall()

        countries = list(results)
        
        cursor.close()
        return countries
    finally:
        db.close()  

def get_leaderboard_top_ten():
    db = connection_pool.connection()
    try:
        cursor = db.cursor()
        query = """SELECT pk, name, score, ROW_NUMBER() OVER (ORDER BY score DESC) AS ranking
                   FROM leaderboard 
                   ORDER BY score DESC
                   LIMIT 10"""
        cursor.execute(query)
        results = cursor.fetchall()

        entries = list(results)
        
        cursor.close()
        return entries
    finally:
        db.close()  

def get_lowest_leaderboard_score():
    db = connection_pool.connection()
    try:
        cursor = db.cursor()
        query = """WITH top_ten AS (
                        SELECT pk, name, score, ROW_NUMBER() OVER (ORDER BY score DESC) AS ranking
                        FROM leaderboard 
                        ORDER BY score DESC)
                   SELECT *
                   FROM top_ten
                   WHERE ranking = 10"""
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result
    finally:
        db.close()  

def get_highest_leaderboard_score():
    db = connection_pool.connection()
    try:
        cursor = db.cursor()
        query = """WITH top_ten AS (
                        SELECT pk, name, score, ROW_NUMBER() OVER (ORDER BY score DESC) AS ranking
                        FROM leaderboard 
                        ORDER BY score DESC)
                   SELECT *
                   FROM top_ten
                   WHERE ranking = 1"""
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result
    finally:
        db.close()  

def insert_to_leaderboard(name, score, ip_address):
    db = connection_pool.connection()
    try:
        cursor = db.cursor()
        query = "INSERT INTO leaderboard (name, score, ip_address) VALUES (%s, %s, %s)"
        values = (name, score, ip_address)
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        return True
    finally:
        db.close()  

def log_game_played_for_ip(ip_address):
    db = connection_pool.connection()
    try:
        cursor = db.cursor()
        cursor.execute("SELECT games_played FROM games WHERE ip_address = %s", (ip_address,))
        result = cursor.fetchone()
        if result:
            cursor.execute("UPDATE games SET games_played = games_played + 1 WHERE ip_address = %s", (ip_address,))
        else:
            cursor.execute("INSERT INTO games (ip_address, games_played) VALUES (%s, %s)", (ip_address, 1))
        db.commit()
        cursor.close()
        return True
    finally:
        db.close()  

