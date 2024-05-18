from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from gpiozero import Servo, OutputDevice, DistanceSensor
from time import sleep
import RPi.GPIO as GPIO
from RpiMotorLib import RpiMotorLib

app = Flask(__name__)
CORS(app)
data={}
GPIO.setmode(GPIO.BCM)

#relay pins
KETTLE_PIN = 4
PUMP_PIN = 5
STIRRER_PIN = 6

#servo pins
ACTUATOR_SERVO = 16
COFFEE_SERVO = 12
CREAMER_SERVO = 13

#stepper pins
STEPS_PIN = 26
DIRECTION_PIN = 27
MOTOR_PINS = (23, 24, 25) # Microstep Resolution MS1-MS3

#ultrasonic pins
TRIG_PIN = 17
ECHO_PIN = 18

# define relay objects - kettle.on/kettle.off
kettle = OutputDevice(KETTLE_PIN, active_high=False, initial_value=False) 
pump = OutputDevice(PUMP_PIN, active_high=False, initial_value=False)
stirrer = OutputDevice(STIRRER_PIN, active_high=False, initial_value=False)

#stepper
slider = RpiMotorLib.A4988Nema(DIRECTION_PIN, STEPS_PIN, MOTOR_PINS, "A4988")

#define servo objects
coffee = Servo(COFFEE_SERVO)
creamer = Servo(CREAMER_SERVO)
actuator = Servo(ACTUATOR_SERVO)

coffee.detach()
creamer.detach()
actuator.detach()


#define ultrasonic sensor
sensor = DistanceSensor(echo=ECHO_PIN, trigger = TRIG_PIN)


def getCurrentTime():
    currentDateAndTime = datetime.now()
    currentTime = currentDateAndTime.strftime("%H:%M")
    return str(currentTime)
    
def slide(steps, direction):
	# direction, "step type", no of steps, step delay, ...
	slider.motor_go(False if direction==1 else True, "Full" , steps , 0.003, False, .05)

#function to dispense coffee/creamer based on quantity received from
#client side
def dispense(item, quantity):
    i = 0
    while True:
        item.min()
        sleep(0.5)
        if (i==1):
            break
        item.max()
        sleep(quantity)
        i+=1
	


def stirrer_down(direction):
    if direction==1:
        actuator.max()
        sleep(0.8)
        actuator.detach()
    else:
        actuator.min()
        sleep(1)
        actuator.detach()
    
def brew(coffee_amt, creamer_amt):

    global data
    sleep(1)
    kettle.on()
    sleep(0.5)
    dispense(coffee, coffee_amt)
    sleep(2)
    slide(725,1)
    sleep(1)
    dispense(creamer, creamer_amt)
    sleep(2)
    slide(700,1)
    sleep(30)  #change this for the time needed to heat the water
    kettle.off()
    sleep(1)
    pump.on()
    sleep(8)
    pump.off()
    sleep(5)
    slide(400, 1)
    sleep(2)
    stirrer_down(1)
    sleep(1)
    stirrer.on()
    sleep(5)
    stirrer.off()
    sleep(1)
    stirrer_down(-1)
    sleep(2)
    slide(1825,-1)
    data['content']['status'] = "Ready"
    print("Waiting to be received")
    while True:
        if (getDistance() > 24):
            print("Received")
            data['content']['status'] = "Idle"
            gpio.cleanup()
            return
    

def getDistance():
    return int(sensor.distance*100)



@app.route('/brew', methods=['POST'])
def get_data():
    global data 
    received_data = request.json
    if received_data:
        if(received_data['content']['time']=="now"):
            received_data['content']["status"] = "Brewing"
        else:
            received_data['content']["status"] = "Timer Set"
            while True:
                if(received_data['content']['time']==getCurrentTime()):
                    received_data['content']["status"] = "Brewing"
                    break
        data = received_data
        brew(coffee_amt = received_data['content']["coffee"], creamer_amt = received_data['content']["creamer"])
        return data, 200
    else:
        return {'error': 'No data received'}, 400

@app.route('/get_update', methods=['GET'])
def get_update():
    global data
    try:
        return (data["content"]["status"])   
    except:
        return "Idle"
    
@app.route('/cup', methods=['GET'])
def cupInPlace():
    cup = False
    if (getDistance() < 24):
        cup = True
    return jsonify({"cupStatus":cup})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
