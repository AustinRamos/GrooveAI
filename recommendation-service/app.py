from flask import Flask, request, jsonify
from model import recommend_items

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    item_id = data['item']
    recommendations = recommend_items(item_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5000)
