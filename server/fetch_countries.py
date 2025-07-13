import requests

def fetch_all_countries():
    url = 'https://restcountries.com/v3.1/all?fields=name,flags,population,area,unMember'
    response = requests.get(url)
    data = response.json()

    countries = []
    for country in data:
        if country.get('unMember'):
            country_info = {
                'name': country.get('name', {}).get('common'),
                'population': country.get('population'),
                'area': country.get('area'),
                'flag': country.get('flags', {}).get('svg')
            }
            countries.append(country_info)
    return countries


if __name__ == '__main__':
    countries = fetch_all_countries()
    countries_sorted = sorted(countries, key= lambda country: country['name'])
    for country in countries_sorted:
        print(country)

