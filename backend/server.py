from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/brew', methods=['POST'])
def receive_message():
    data = request.json
    if data:
        data['content']["status"] = "Brewing"
        return data, 200
    else:
        return {'error': 'No message received'}, 400

if __name__ == '__main__':
    app.run(debug=True)