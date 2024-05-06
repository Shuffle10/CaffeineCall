from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
data={}

def getCurrentTime():
    currentDateAndTime = datetime.now()
    currentTime = currentDateAndTime.strftime("%H:%M")
    return str(currentTime)

@app.route('/brew', methods=['POST'])
def get_data():
    global data 
    received_data = request.json
    if received_data:
        print(received_data['content']['time'])
        if(received_data['content']['time']==getCurrentTime()):
            received_data['content']["status"] = "Brewing"
            brew(received_data['content'])
        else:
            received_data['content']["status"] = "Timer Set"
        data = received_data
        return data, 200
    else:
        return {'error': 'No data received'}, 400

@app.route('/get_update', methods=['GET'])
def get_update():
    global data
    try:
        if(data['content']['time']==getCurrentTime()):
            data['content']["status"] = "Brewing"
        return (data["content"]["status"])   
    except:
        return "Idle"
    
@app.route('/cup', methods=['GET'])
def cupInPlace():
    #logic to check cup in place using a sensor
    return jsonify({"cupStatus":True})


def brew(data):
    print(data)
    
     


if __name__ == '__main__':
    app.run(debug=True)
