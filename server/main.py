from flask import Flask, jsonify, request
from flask_cors import CORS
from sql_methods import get_country_list, get_leaderboard_top_ten, get_lowest_leaderboard_score, get_highest_leaderboard_score, insert_to_leaderboard, log_game_played_for_ip

app = Flask(__name__)
CORS(app)

@app.route('/api/get_countries', methods=['GET'])
def get_countries():
    countries = get_country_list()
    return jsonify({'countries': countries})

@app.route('/api/get_leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = get_leaderboard_top_ten()
    return jsonify({'leaderboard': leaderboard})

@app.route('/api/get_leaderboard_high_low', methods=['GET'])
def get_leaderboard_high_low_endpoint():
    lowest = get_lowest_leaderboard_score()
    highest = get_highest_leaderboard_score()
    return jsonify({'lowest': lowest, 'highest': highest})

@app.route('/api/insert_leaderboard', methods=['POST'])
def insert_leaderboard():
    data = request.get_json()
    name = data.get('name')
    score = data.get('score')
    ip_address = data.get('ip_address')
    insert_to_leaderboard(name, score, ip_address)
    return jsonify({'success': True}), 200

@app.route('/api/log_game_played', methods=['POST'])
def log_game_played():
    data = request.get_json()
    ip_address = data.get('ip_address')
    if not ip_address:
        return jsonify({'success': False, 'error': 'No IP address provided'}), 400
    log_game_played_for_ip(ip_address)
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)

