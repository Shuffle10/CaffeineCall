# Caffeine Call

### BrewTech - Raspberry Pi Final Project

Caffeine Call is a web-controlled smart coffee maker with an alarm system, designed to brew coffee at a scheduled time with user-defined coffee and creamer amounts. This project was built using Flask, Raspberry Pi GPIO, and a touchscreen GUI. It automates the entire brewing process, from dispensing ingredients to notifying the user when the coffee is ready.

---

## Features
- Web-based control – Set coffee preferences and schedule brewing via an intuitive GUI
- Automated brewing – Dispenses coffee, heats water, stirs the mixture, and pours automatically
- Alarm system – Notifies the user when the coffee is ready
- GPIO-controlled hardware – Uses servos, stepper motors, relays, and sensors to execute the brewing process
- Cup detection – Prevents spills by ensuring a cup is in place before dispensing

---

## Demo Video

[![Watch the Video](https://img.youtube.com/vi/pFME7KdVcm0/0.jpg)](https://www.youtube.com/watch?v=pFME7KdVcm0)

Click the link above to watch the project

---

## How It Works
### Frontend (React)
- Built with React and Vite for fast and efficient rendering
- Communicates with the backend through API requests to trigger brewing actions and check coffee status

### Backend (Flask Server)
- Runs on Raspberry Pi to process user inputs and control hardware
- Provides API endpoints for brewing and status updates
- Uses RpiMotorLib, GPIO Zero, and Flask CORS

### Hardware Components
- Servo motors – Dispense coffee and creamer
- Stepper motor – Moves dispensing system
- Relays – Controls water heater and pump
- Ultrasonic sensor – Detects cup placement

---


## Credits
- Saphal Pant
- Jack Revelett

