import mysql.connector

def create_tables():
    db = mysql.connector.connect('')
    cursor = db.cursor()

    sql = """CREATE TABLE countries(
            pk INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            population BIGINT,
            land_area BIGINT,
            is_state VARCHAR(2),
            pic_url TEXT
        );"""  
    
    cursor.execute(sql)

    sql = """CREATE TABLE leaderboard(
            pk INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            score BIGINT,
            ip_address TEXT
        );"""

    cursor.execute(sql)

    sql = """CREATE TABLE games(
            pk INT AUTO_INCREMENT PRIMARY KEY,
            ip_address TEXT,
            games_played BIGINT
        );"""

    cursor.execute(sql)

if __name__ == '__main__':
    create_tables()
