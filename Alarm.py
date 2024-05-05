
import datetime
import time
import pygame

class alarm:
    @staticmethod
    def setalarm(alarmtime):
        pygame.init()
        pygame.mixer.init()
        sound = pygame.mixer.Sound("sound2.mp3")
        snooze_time = 2
        while True:
            current_time = datetime.datetime.now().strftime("%H:%M")
            if current_time == alarmtime:
                sound.play(loops=-1)
                response = input("Press enter to disable the alarm: ")
                sound.stop()

            time.sleep(1)

# TESTING FUNCTIONALITY
alarm_time = input("Enter the time for the alarm (HH:MM): ")
print(f"Alarm set for {alarm_time}")
alarm.setalarm(alarm_time)

