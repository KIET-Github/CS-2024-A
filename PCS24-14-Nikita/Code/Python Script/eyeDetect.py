# Importing the necessary libraries

import cv2 as cv
import numpy as np
import mediapipe as mp
# from cvzone.SerialModule import SerialObject
import pyrebase
from datetime import datetime
import time

# Variable telling the drowsiness status
isDrowsy = False

# Connecting to the realtime-Firebase
config = {
//CONFIEDNTIAL
}
firebase = pyrebase.initialize_app(config)
database = firebase.database()


# Function to calculate the open length of the eye
def open_len(arr):
    y_arr = []

    for _,y in arr:
        y_arr.append(y)

    min_y = min(y_arr)
    max_y = max(y_arr)

    return max_y - min_y


# Defining face mesh to calculate the drowisness status
mp_face_mesh = mp.solutions.face_mesh
RIGHT_EYE = [ 362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385,384, 398 ]
LEFT_EYE = [ 33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161 , 246 ]
# arduino = SerialObject()
start_time = time.time()                #Data is logged every 10 seconds, so it's is used to start the counter.
cap = cv.VideoCapture(0)

with mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
) as face_mesh:

    drowsy_frames = 0

    max_left = 0
    max_right = 0

    while True:

        ret, frame = cap.read()
        if not ret:
            break

        frame = cv.flip(frame, 1)
        rgb_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        img_h, img_w = frame.shape[:2]

        results = face_mesh.process(rgb_frame)

        if results.multi_face_landmarks:

            all_landmarks = np.array([np.multiply([p.x, p.y], [img_w, img_h]).astype(int) for p in results.multi_face_landmarks[0].landmark])

            right_eye = all_landmarks[RIGHT_EYE]
            left_eye = all_landmarks[LEFT_EYE]

            cv.polylines(frame, [left_eye], True, (0,255,0), 1, cv.LINE_AA)
            cv.polylines(frame, [right_eye], True, (0,255,0), 1, cv.LINE_AA) 

            len_left = open_len(right_eye)
            len_right = open_len(left_eye)

            if len_left > max_left:
                max_left = len_left

            if len_right > max_right:
                max_right = len_right

            cv.putText(img=frame, text='Max: ' + str(max_left)  + ' Left Eye: ' + str(len_left), fontFace=0, org=(10, 30), fontScale=0.5, color=(0, 255, 0))
            cv.putText(img=frame, text='Max: ' + str(max_right)  + ' Right Eye: ' + str(len_right), fontFace=0, org=(10, 50), fontScale=0.5, color=(0, 255, 0))

            if (len_left <= int(max_left / 2) + 1 and len_right <= int(max_right / 2) + 1):
                drowsy_frames += 1                                                            # Increasing the count of Drowsy Frames
            else:
                drowsy_frames = 0                                                             # Resetting the count of Drowsy Frames
            if (drowsy_frames > 20):
                isDrowsy = True
                # arduino.sendData([2])
                
                cv.putText(img=frame, text='ALERT', fontFace=0, org=(200, 300), fontScale=3, color=(0, 0, 255), thickness = 4)
            else:
                pass
                # arduino.sendData([1])
                isDrowsy = False

           
            if time.time() - start_time >= 10:                                                # Logging data every 10 seconds
            # if True:
                now = datetime.now()
                ## READ THE SENSOR DATA
                date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
                data = {
                        "logStat" : date_time,
                        "isDrowsy": isDrowsy,
                        "cabinTemperature": 28,
                        "cargoTemperature" : 24,
                        "isDrunk": False,
                        "speed" : 56,
                        "location": "27.5746998, 81.6079353",
                        "drivingDuration_hrs" : 3.5,
                        "message" : "Take a Rest" if isDrowsy else "Going Good",
                }
                database.child("Drivers").child("Driver1").push(data)
                print("Data logged successfully")
                print(time.time() - start_time)
                start_time = time.time()


        cv.imshow('img', frame)
        key = cv.waitKey(1)
        if key == ord('q'):
            break

cap.release()
cv.destroyAllWindows()
