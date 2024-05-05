

from gpiozero import DistanceSensor


def stop_functionality():
    return True

ultrasonic = DistanceSensor(echo=17, trigger=4, threshold_distance=0.6)
while True:
    print(ultrasonic.distance)
    ultrasonic.when_out_of_range = stop_functionality



def check_distance(dist):
    temp_dist = ultrasonic.distance
    if temp_dist in range(dist - 0.1, dist + 0.1):
        return True
    else:
        while temp_dist not in range(dist - 0.1, dist + 0.1):
            temp_dist = ultrasonic.distance
    return True

