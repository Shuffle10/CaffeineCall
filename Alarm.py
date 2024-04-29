
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
                print("Wake up, your coffee is ready!")
                sound.play(loops=-1)
                response = input("Press any key to snooze, or enter 'coffee' to disable the alarm: ")
                if response.lower() == 'coffee':
                    print("Alarm disabled, enjoy your coffee")
                    sound.stop()
                    break
                else:
                    print("Snoozed for 5 minutes")
                    alarm_time = (datetime.datetime.now() + datetime.timedelta(minutes=snooze_time)).strftime("%H:%M")
                    print(alarm_time)
                    time.sleep(snooze_time * 60)

            time.sleep(1)

# TESTING FUNCTIONALITY
alarm_time = input("Enter the time for the alarm (HH:MM): ")
print(f"Alarm set for {alarm_time}")
alarm.setalarm(alarm_time)

