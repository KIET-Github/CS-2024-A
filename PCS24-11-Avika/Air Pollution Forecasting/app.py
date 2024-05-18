import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))


@app.route('/')
def home():
    return render_template('webair.html')


@app.route('/predict', methods=['POST'])
def predict():
    # Extract input features from the form
    input_features = [float(request.form['SO2i']), float(request.form['NO2i']), float(request.form['O3i']),
                      float(request.form['PM25i']), float(request.form['PM10i']), float(request.form['COi'])]

    # Make a prediction using the loaded model
    prediction = model.predict([input_features])

    # Format the prediction for display
    output = prediction[0]

    return render_template('webair.html', prediction_text="Predicted AQI: {}".format(output))


if __name__ == '__main__':
    app.run(debug=True)
