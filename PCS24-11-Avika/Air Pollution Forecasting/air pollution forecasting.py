import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn import metrics
from sklearn.metrics import mean_absolute_error,mean_squared_error,r2_score
from sklearn.metrics import accuracy_score,confusion_matrix
from pandas_visual_analysis import VisualAnalysis

Data=pd.read_csv(r"C:\Users\Avi Chaudhary\Desktop\Machine learning (Data)\2020-2023(sanjay nagar).csv")
Data

Data.drop([0],axis=0,inplace=True)

Data

Data.head()

Data.isnull().sum()

Data.shape

Data.info()

Data.columns

Data.dtypes

Data.drop(['Xylene','MP-Xylene','Eth-Benzene','TOT-RF'],inplace=True,axis=1)

Data

Data

Data6=Data.fillna(Data.mean())
Data6

Data.corr()

Data.head()

df=Data[['From Date', 'To Date', 'PM2.5', 'PM10', 'NO2','SO2', 'CO', 'Ozone']]

df.head()

df.isnull().sum()

def cal_SO2i(SO2):
    si=0
    if(SO2<=40):
        si=SO2*(50/40)
    elif(SO2>40 and SO2<=80):
        si=50+(SO2-40)*(50/40)
    elif(SO2>80 and SO2<=380):
        si=100+(SO2-80)*(100/300)
    elif(SO2>380 and SO2<=800):
        si=200+(SO2-380)*(100/420)
    elif(SO2>800 and SO2<=1600):
        si=300+(SO2-800)*(100/800)
    elif(SO2>1600):
        si=400+(SO2-1600)*(100/800)
    return si
df['SO2i']=df['SO2'].apply(cal_SO2i)
data=df[['SO2','SO2i']]
data.head()
#calculating the individual pollutant index for so2


def cal_NO2i(NO2):
    ni = 0
    if NO2 <= 40:
        ni = NO2 * 50/40
    elif NO2 > 40 and NO2 <= 80:
        ni = 50 + (NO2 - 40) * (50/40)
    elif NO2 > 80 and NO2 <= 180:
        ni = 100 + (NO2 - 80) * (100/100)
    elif NO2 > 180 and NO2 <= 280:
        ni = 200 + (NO2 - 180) * (100/100)
    elif NO2 > 280 and NO2 <= 400:
        ni = 300 + (NO2 - 280) * (100/120)
    else:
        ni = 400 + (NO2 - 400) * (100/120)
    return ni

df['NO2i'] = df['NO2'].apply(cal_NO2i)
data = df[['NO2', 'NO2i']]
data.head()


def cal_O3i(Ozone):
    if Ozone <= 50:
        O3i = Ozone*50/50
    elif Ozone > 50 and Ozone <= 100:
        O3i = 50 + (Ozone-50)*(50/50)
    elif Ozone > 100 and Ozone <= 168:
        O3i = 100 + (Ozone-100)*(100/68)
    elif Ozone > 168 and Ozone <= 208:
        O3i = 200 + (Ozone-168)*(100/40)
    elif Ozone > 208 and Ozone <= 748:
        O3i = 300 + (Ozone-208)*(100/540)
    else:
        O3i = 400 + (Ozone-748)*(100/252)
    return O3i

df['O3i'] = df['Ozone'].apply(cal_O3i)
data = df[['Ozone', 'O3i']]
data.head()

def cal_PM25i(PM25):
    if PM25 <= 30:
        PM25i = PM25*50/30
    elif PM25 > 30 and PM25 <= 60:
        PM25i = 50 + (PM25-30)*(50/30)
    elif PM25 > 60 and PM25 <= 90:
        PM25i = 100 + (PM25-60)*(100/30)
    elif PM25 > 90 and PM25 <= 120:
        PM25i = 200 + (PM25-90)*(100/30)
    elif PM25 > 120 and PM25 <= 250:
        PM25i = 300 + (PM25-120)*(100/130)
    else:
        PM25i = 400 + (PM25-250)*(100/130)
    return PM25i

df['PM25i'] = df['PM2.5'].apply(cal_PM25i)
data = df[['PM2.5', 'PM25i']]
data.head()

def cal_PM10i(PM10):
    pi = 0
    if PM10 <= 50:
        pi = PM10 * 50 / 50
    elif PM10 > 50 and PM10 <= 100:
        pi = 50 + (PM10 - 50) * (50 / 50)
    elif PM10 > 100 and PM10 <= 250:
        pi = 100 + (PM10 - 100) * (100 / 150)
    elif PM10 > 250 and PM10 <= 350:
        pi = 200 + (PM10 - 250) * (100 / 100)
    elif PM10 > 350 and PM10 <= 430:
        pi = 300 + (PM10 - 350) * (100 / 80)
    else:
        pi = 400 + (PM10 - 430) * (100 / 70)
    return pi

df['PM10i'] = df['PM10'].apply(cal_PM10i)
data = df[['PM10', 'PM10i']]
data.head()

def cal_COi(CO):
    if CO <= 1:
        COi = CO * 50/1
    elif CO > 1 and CO <= 2:
        COi = 50 + (CO - 1) * (50/1)
    elif CO > 2 and CO <= 10:
        COi = 100 + (CO - 2) * (100/8)
    elif CO > 10 and CO <= 17:
        COi = 200 + (CO - 10) * (100/7)
    elif CO > 17 and CO <= 34:
        COi = 300 + (CO - 17) * (100/17)
    else:
        COi = 400 + (CO - 34) * (100/16)
    return COi
df['COi'] = df['CO'].apply(cal_COi)
data = df[['CO', 'COi']]
data.head()


def cal_aqi(si,ni,O3i,PM25i,pi,COi):
    aqi=0
    if(si>ni and si>O3i and si>PM25i and si>pi and si>COi):
        aqi=si
    if(ni>si and ni>O3i and ni>PM25i and ni>pi and ni>COi):
        aqi=ni
    if(O3i>si and O3i>ni and O3i>PM25i and O3i>pi and O3i>COi):
        aqi=O3i
    if(PM25i>si and PM25i>ni and PM25i>pi and PM25i>COi):
        aqi=PM25i
    if(pi>si and pi>ni and pi>PM25i and pi>COi):
        aqi=pi
    if(COi>si and COi>ni and COi>PM25i and COi>pi):
        aqi=COi
    return aqi

df['AQI']=df.apply(lambda x:cal_aqi(x['SO2i'],x['NO2i'],x['O3i'],x['PM25i'],x['PM10i'],x['COi']),axis=1)
data=df[['From Date', 'To Date', 'PM25i','PM10i','NO2i','SO2i','COi','O3i','AQI']]
data.head()
        

def AQI_Range(x):
    if(x<50):
        return "Good"
    elif x>50 and x<=100:
        return "Moderate"
    elif x>100 and x<=200:
        return "Poor"
    elif x>200 and x<=300:
        return "Unhealthy"
    elif x>300 and x<=400:
        return"Very Unhealthy"
    elif x>400:
        return "Hazardous"
    
df['AQI_Range']=df['AQI'].apply(AQI_Range)
df.head()

df['AQI_Range'].value_counts()
#These are the counts of values present in the AqI_Range column

x=df[['SO2i','NO2i','O3i','PM25i','PM10i','COi']]
y=df['AQI']
x.head()

y.head()
#the AQI column is the target column

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=70)
print(x_train.shape,x_test.shape,y_train.shape,y_test.shape)
#splitting the data into training and testing data

## Multi Linear Regression 

model=LinearRegression()
model.fit(x_train,y_train)

#predicting train
train_pred=model.predict(x_train)
#predicting on test
test_pred=model.predict(x_test)

RMSE_train=(np.sqrt(metrics.mean_squared_error(y_train,train_pred)))
RMSE_test=(np.sqrt(metrics.mean_squared_error(y_test,test_pred)))
print("RMSE TrainingData =",str(RMSE_train))
print("RMSE TestData = ",str(RMSE_test))
print('-'*50)
print('RSquared value on train:',model.score(x_train,y_train))
print('RSquared value on test:',model.score(x_test,y_test))

## Decision Tree Regressor

DT=DecisionTreeRegressor()
DT.fit(x_train,y_train)

#predicting train
train_preds=DT.predict(x_train)
#predicting on test
test_preds=DT.predict(x_test)

RMSE_train=(np.sqrt(metrics.mean_squared_error(y_train,train_preds)))
RMSE_test=(np.sqrt(metrics.mean_squared_error(y_test,test_preds)))
print("RMSE TRainingData =",str(RMSE_test))
print("-"*50)
print('RSquared value on train:',DT.score(x_train,y_train))
print('RSquared value on test:',DT.score(x_test,y_test))

## Random Forest Regressor

RF=RandomForestRegressor().fit(x_train,y_train)

#predicting train
train_preds1=RF.predict(x_train)
#predicting on test
test_preds1=RF.predict(x_test)

RMSE_train=(np.sqrt(metrics.mean_squared_error(y_train,train_preds1)))
RMSE_test=(np.sqrt(metrics.mean_squared_error(y_test,test_preds1)))
print("RMSE TrainingData = ",str(RMSE_train))
print("RMSE TestData = ",str(RMSE_test))
print('-'*50)
print('RSquared value on train :',RF.score(x_train,y_train))
print('RSquared value on test:',RF.score(x_test,y_test))

# Classification Algorithm 

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier

x2=df[['SO2i','NO2i','O3i','PM25i','PM10i','COi']]
y2=df['AQI_Range']
#Splitting the data into independent and dependent columns for classification

x_train2,x_test2,y_train2,y_test2=train_test_split(x2,y2,test_size=0.33,random_state=70)
#splitting the data into training and testing data

## Logistic Regression

#fit the model on train data
log_reg = LogisticRegression().fit(x_train2,y_train2)

#predict on train
train_preds2 = log_reg.predict(x_train2)
#accuracy on train
print("Model accuracy on train is: ", accuracy_score(y_train2,train_preds2))
#predict on test
test_preds2 = log_reg.predict(x_test2)
print("Model accuracy on test is: ", accuracy_score(y_test2,test_preds2))
print('-'*50)

#kappa score
print('Kappascore is: ',metrics.cohen_kappa_score(y_test2,test_preds2))


log_reg.predict([[727,327.55,78.2,100,234,543]])

## Decision Tree Classifier

#fit the model on train data
DT2 = DecisionTreeClassifier().fit(x_train2,y_train2)

#predict on train
train_preds3 = DT2.predict(x_train2)
#accuracy on train
print("Model accuracy on train is: ", accuracy_score(y_train2,train_preds3))
#predict on test
test_preds3 = DT2.predict(x_test2)
print("Model accuracy on test is: ", accuracy_score(y_test2,test_preds3))
print('-'*50)

#kappa score
print('Kappascore is: ',metrics.cohen_kappa_score(y_test2,test_preds3))

## Random Forest Classifier 

RF=RandomForestClassifier().fit(x_train2,y_train2)

#predict on train
train_preds4 = RF.predict(x_train2)
#accuracy on train
print("Model accuracy on train is: ", accuracy_score(y_train2,train_preds4))
#predict on test
test_preds4 = RF.predict(x_test2)
print("Model accuracy on test is: ", accuracy_score(y_test2,test_preds4))
print('-'*50)

#kappa score
print('Kappascore is: ',metrics.cohen_kappa_score(y_test2,test_preds4))


## K-Nearest Neighbours

#fit the model on train data
KNN = KNeighborsClassifier().fit(x_train2,y_train2)
#predict on train
train_preds5 = KNN.predict(x_train2)
#accuracy on train
print("Model accuracy on train is: ", accuracy_score(y_train2,train_preds5))
#predict on test
test_preds5 = KNN.predict(x_test2)
print("Model accuracy on test is: ", accuracy_score(y_test2,test_preds5))
print('-'*50)

#kappa score
print('Kappascore is: ',metrics.cohen_kappa_score(y_test2,test_preds5))

sns.pairplot(data=df)

plt.figure(figsize=(15,6))
plt.xticks(rotation=90)
df.SO2i.hist()
plt.xlabel('SO2i')
plt.ylabel('AQI')
plt.plot()

plt.figure(figsize=(15,6))
plt.xticks(rotation=90)
df.NO2i.hist()
plt.xlabel('NO2i')
plt.ylabel('AQI')
plt.plot()

plt.figure(figsize=(15,6))
plt.xticks(rotation=90)
df.O3i.hist()
plt.xlabel('O3i')
plt.ylabel('AQI')
plt.plot()

plt.figure(figsize=(15,6))
plt.xticks(rotation=90)
df.PM25i.hist()
plt.xlabel('PM25i')
plt.ylabel('AQI')
plt.plot()

plt.figure(figsize=(15,6))
plt.xticks(rotation=90)
df.PM10i.hist()
plt.xlabel('PM10i')
plt.ylabel('AQI')
plt.plot()

plt.figure(figsize=(15,6))
plt.xticks(rotation=90)
df.COi.hist()
plt.xlabel('COi')
plt.ylabel('AQI')
plt.plot()

plt.figure(figsize=(100,50))
plt.xticks(rotation=90)
sns.barplot(x='SO2i',y='AQI',data=df);

plt.figure(figsize=(100,50))
plt.xticks(rotation=90)
sns.barplot(x='NO2i',y='AQI',data=df);

plt.figure(figsize=(100,50))
plt.xticks(rotation=90)
sns.barplot(x='O3i',y='AQI',data=df);

df[['SO2i','NO2i','O3i','PM25i','PM10i','COi']].groupby(["SO2i"]).mean().sort_values(by='SO2i').plot.bar(color='purple')
plt.show()

KNN.predict([[7.4,47,78,182,100,78.7]])

# Your machine learning model training code (e.g., Linear Regression, Decision Tree, etc.)
# ...

# Assuming that you have trained and defined your 'regressor' model

import pickle

# Save the model to a file named 'model.pkl'
with open('model.pkl', 'wb') as model_file:
    pickle.dump(DT2, model_file)



# Load the model from 'model.pkl' file
with open('model.pkl', 'rb') as model_file:
    loaded_DT2 = pickle.load(model_file)

# Now, `loaded_regressor` contains the model loaded from the file and can be used for predictions.


