#include <Arduino.h>
#include <HardwareSerial.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <time.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

FirebaseData fbdo;                                                                                         // For Firebase Database
FirebaseAuth auth;                                                                                         // For Firebase Authenticatin
FirebaseConfig configg;                                                                                    // For Firebase Configuration


//API key
#define API_KEY "A******************************fc"

// RTDB URL define the RTDB URL
#define DATABASE_URL "*******************************"

const int blinkSensorPin = 23; // Replace with your sensor's pin
const int MQ3 = 25;

// Initialize variables
volatile int blinkCount = 0;
float mq3Value;
unsigned long lastMillis;
unsigned long interval = 60000; // 1 minute interval

FirebaseJson jsonIncident, jsonCargo;
int totalIncidents = 0;
bool isCargo = false;
String databasePath;
String uid; 
int setHumidity,currHumidity;
int setTemperature, currTemperature;




// Wifi details

const char* ssid = "***********";
const char* password = "***********";

#define USER_EMAIL "************"
#define USER_PASSWORD "*************"








void setup() {
  // Initialize Serial Monitor
  Serial.begin(115200);
  Serial.println("MQ3 Heating Up!");

  // Initialize lastMillis
  lastMillis = millis();

  //Initialize Time
  configTime(0, 0, "pool.ntp.org");
  Serial.println("Time Library Initialized...");

  
  WiFi.mode(WIFI_STA); //Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(100);
  }
  Serial.println("\nConnected to the WiFi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
  Serial.print("Waiting for time sync...");
  while (time(nullptr) < 100000) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println();

  // Connecting to the firebase
  configg.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  configg.database_url = DATABASE_URL;
  // Assign the callback function for the long running token generation task
  configg.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  // Assign the maximum retry of token generation
  configg.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&configg, &auth);
  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  //Updating the totalIncidents variable.
  
  FirebaseJsonData res;  
   
  if (Firebase.RTDB.getInt(&fbdo, "/UserID/User1/DriverStats/TotalDrowsyIncidents" )) {
     totalIncidents = fbdo.to<int>();
     Serial.print("total Incidents till now: ");
     Serial.println(totalIncidents);
  }else{
     Serial.println("Error while reading variable at /userID/user1/DriverStats/TotalDrowsyIncidents ");
     Serial.println(fbdo.errorReason());
  }

  databasePath = "/UserID/User1";
  Serial.println("Setup done");
  if (Firebase.RTDB.getInt(&fbdo, "/UserID/User1/CargoDetails/isValid" )) {
     isCargo = fbdo.to<bool>();
     Serial.print("Cargo Found?: ");
     Serial.println(isCargo);
  }else{
     Serial.println("Error while reading variable at /UserID/User1/CargoDetails/isValid ");
     Serial.println(fbdo.errorReason());
  }
  if(isCargo){
    if (Firebase.RTDB.getInt(&fbdo, "/UserID/User1/CargoDetails/setTemperature" )) {
         setTemperature = fbdo.to<int>();
         Serial.print("Set Temperature ");
         Serial.println(setTemperature);
      }else{
         Serial.println("Error while reading variable at /UserID/User1/CargoDetails/setTemperature ");
         Serial.println(fbdo.errorReason());
      }
      if (Firebase.RTDB.getInt(&fbdo, "/UserID/User1/CargoDetails/setHumidity" )) {
         setHumidity = fbdo.to<int>();
         Serial.print("Set Humidity ");
         Serial.println(setHumidity);
      }else{
         Serial.println("Error while reading variable at /UserID/User1/CargoDetails/setHumidity ");
         Serial.println(fbdo.errorReason());
      }
  }
  Serial.println("Heating MQ3 Sensor");
  for(int i=0;i<=10;i++){
    Serial.print("*");
    delay(1000);
  }
  Serial.println();
  Serial.println("MQ3 Set up.");
}



void loop() {
  int stat = digitalRead(blinkSensorPin);
  if(stat == 1){
    blinkCount++;
    Serial.println("Blink ;-)");
    delay(400);
    lastMillis+= 400;
  }
  // Check if 1 minute has elapsed
  if (millis() - lastMillis >= interval) {
    // Calculate blinks per minute
    float blinksPerMinute = (blinkCount / (float)interval) * 60000;
    // Reset blink count and update lastMillis
    blinkCount = 0;
    lastMillis = millis();
    mq3Value = analogRead(MQ3);
    mq3Value = map(mq3Value,0,1023,0,100);

    
    // Variable to store MQ3 status. If alcohol presence is more than 65%, then it will set is Sale to false.
    
    bool mq3Status;
    bool drowsyStatus;
    if(mq3Value > 65)
      mq3Status = true;
    else
      mq3Status = false;
    // Use the result
    Serial.print("MQ3 Value: ");
    Serial.print(mq3Value);
    Serial.print("  || Harmful Gasses/Alcohol Present: ");
    Serial.println(mq3Status);
    
    Serial.print("Blinks per Minute: ");
    Serial.println(blinksPerMinute);

    /*
        Possible cases
        isDrowsy    mq3Status    Alert
        false       false       false  
        false       true        true
        true        false       true
        true        true        true
    */   
    if(blinksPerMinute > 21)
    {
      drowsyStatus = true;
    }
    else{
      drowsyStatus = false;
    }
    Serial.print("Drowsy Status:");
    Serial.println(drowsyStatus);
    if(!drowsyStatus && !mq3Status){
      Serial.println("in if");
      jsonIncident.set("blinksPerMinute", blinksPerMinute);
      jsonIncident.set("TotalDrowsyIncidents", totalIncidents);
      jsonIncident.set("CarSpeed",random(20,80));
      jsonIncident.set("isDrowsy",false);
      jsonIncident.set("isSafe",true);
      jsonIncident.set("alert",false);
      // Add Location
    }

    else{
      totalIncidents++;
      Serial.println("in else");
      jsonIncident.set("blinksPerMinute", blinksPerMinute);
      jsonIncident.set("TotalDrowsyIncidents", totalIncidents);
      jsonIncident.set("CarSpeed",random(20,80));
      jsonIncident.set("isDrowsy",drowsyStatus);
      jsonIncident.set("isSafe",mq3Status);
      jsonIncident.set("alert",true);
      // Add Location
    }
    
    
//    if(blinksPerMinute > 21){
//      totalIncidents++;
//      jsonIncident.set("blinksPerMinute", blinksPerMinute);
//      jsonIncident.set("TotalDrowsyIncidents", totalIncidents);
//      jsonIncident.set("CarSpeed",random(20,80));
//      jsonIncident.set("isDrowsy",true);
//      jsonIncident.set("isSafe",true);
//      jsonIncident.set("alert",true);
//      // Add Location
//    }
//    else{
//      jsonIncident.set("blinksPerMinute", blinksPerMinute);
//      jsonIncident.set("TotalDrowsyIncidents", totalIncidents);
//      jsonIncident.set("CarSpeed",random(20,80));
//      jsonIncident.set("isDrowsy",false);
//      jsonIncident.set("isSafe",true);
//      jsonIncident.set("alert",false);
//      // Add Location
//    }
    Firebase.RTDB.updateNode(&fbdo,databasePath+"/DriverStats/",&jsonIncident);
    Serial.println("Details Updated");
  }
  if (isCargo && millis() - lastMillis >= 300000) {
      //Update the Humidity and Temperature from DHT11.
      currHumidity = random(0,setHumidity-5);
      currTemperature = random(0,setTemperature-5);
      if(currHumidity > setHumidity || currTemperature > setTemperature){
        jsonCargo.set("isOkay", false);
      }

      jsonCargo.set("currHumidity",currHumidity);
      jsonCargo.set("currTemperature",currTemperature);
      
      Firebase.RTDB.updateNode(&fbdo,databasePath+"/CargoDetails/",&jsonCargo);
      Serial.println("Cargo Details Updated");
  }
  
  
}
