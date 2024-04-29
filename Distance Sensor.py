

from gpiozero import DistanceSensor


def stop_functionality():
    return False

ultrasonic = DistanceSensor(echo=17, trigger=4, threshold_distance=0.6)
while True:
    print(ultrasonic.distance)
    ultrasonic.when_out_of_range = stop_functionality

