from flask import Flask, render_template, jsonify
from flask_cors import CORS
import json
import mysql.connector

app = Flask(__name__)
CORS(app)

# Replace these values with your actual MySQL database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'archit',
    'database': 'truecheck',
}

@app.route('/')
def index():
    return render_template('serverup.html')

@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Example query: Retrieve data from your_table
        # query = "SELECT * FROM your_table"
        query = "SELECT COUNT(*) FROM brand"
        cursor.execute(query)
        data = cursor.fetchall()
        print(data)
        return jsonify({'data': data})

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the database connection
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()




@app.route('/check_product', methods=['GET'])
def check_product():
    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Example query: Retrieve data from your_table
        # query = "SELECT * FROM your_table"
        query = "SELECT COUNT(*) AS ROWCOUNT FROM admins"
        cursor.execute(query)
        # data = cursor.fetchall()
        # data = json.loads()
        data = cursor.fetchall()
        row_count = data[0]['ROWCOUNT'] if data else 0
        # results = len(data)
        # if results>0:
        #     data=data[0]
        #     empId, fname, lname, passw  = data[1], data[2], data[3],data[4]
        # print(data[1])
        # if(data>0):
        #     return True
        # else:
        #     return False
        if row_count > 0:
            return jsonify({'result': True})
        else:
            return jsonify({'result': False})
        

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the database connection
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/add_admin', methods=['POST'])
def add_admin():
    try:
        # Connect to the MySQL database
        print("here")
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # query = "SELECT COUNT(*) AS ROWCOUNT FROM admins"
        # query = "INSERT INTO ADMINS (`emp_id`, `first_name`, `last_name`, `pass_word`, `user_group`) VALUES ('199', 'manaaaaaaaaaa', 'ger', 'w', 'Manager')"
        # cursor.execute(query)
        # connection.commit()

        #returning json
        query = "SELECT * FROM admins WHERE emp_id = 199"
        cursor.execute(query)
        data = cursor.fetchall()
        print(data)
        #print(data) 
        #jsonObj = data[0]
        #json_str = json.dumps(list(jsonObj))
        #print(json_str)
        return json.dumps(data,indent=2,default=str)

        #checking if added
        # check_query = "SELECT COUNT(*) AS padmin FROM ADMINS WHERE `emp_id` = '196'"
        # cursor.execute(check_query)
        # data = cursor.fetchall()
        # admin_count = data[0]['padmin'] if data else 0

        # return jsonify({'result': admin_count > 0})
        

    except Exception as e:
        return jsonify({'error': str(e)})

    finally:
        # Close the database connection
        if 'connection' in locals() and connection.is_connected():
            cursor.close()
            connection.close()

            

if __name__ == '__main__':
    app.run(debug=True)
