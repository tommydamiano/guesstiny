import mysql.connector
from fetch_countries import fetch_all_countries
from define_us_states import US_STATES

def insert_countries_to_db():
    db = mysql.connector.connect('')
    cursor = db.cursor()
    countries = fetch_all_countries()

    query = """INSERT INTO countries (name, population, land_area, is_state, pic_url) 
                      VALUES (%s, %s, %s, %s, %s)
                   """

    for country in countries:
        name = country.get('name')
        population = country.get('population')
        land_area = country.get('area')
        is_state = 'N'  
        pic_url = country.get('flag')
        cursor.execute(query, (name, population, land_area, is_state, pic_url))
    
    db.commit()
    cursor.close()
    db.close()

def insert_us_states_to_db():
    db = mysql.connector.connect('')
    cursor = db.cursor()
    
    query = """INSERT INTO countries (name, population, land_area, is_state, pic_url) 
               VALUES (%s, %s, %s, %s, %s)
            """
    
    for state in US_STATES:
        name = state.get('name')
        population = state.get('population')
        land_area = state.get('area')
        is_state = 'Y'  
        pic_url = state.get('flag')
        cursor.execute(query, (name, population, land_area, is_state, pic_url))
    
    db.commit()
    cursor.close()
    db.close()

