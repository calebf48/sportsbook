from flask import Flask, jsonify, render_template, send_from_directory
import subprocess
import os

app = Flask(__name__)

#Serve HTML from templates folder
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/spread')
def spread():
    return render_template('spread.html')

#Define a route to call Python script
@app.route('/refresh', methods=['GET'])
def run_script():
    try:
        #Call script using subprocess
        result = subprocess.run(['python', 'request.py'], capture_output=True, text=True)

        #Get output of script
        output = result.stdout
        
        return jsonify({'success': True, 'output': output})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/get-refresh-date', methods=['GET'])
def get_refresh_date():
    try:
        file_path = os.path.join(app.root_path, 'static/data/response_headers.txt')

        with open(file_path, 'r') as file:
            lines = file.readlines()
            if len(lines) > 1:
                date_line = lines[1]
                #Extract date from the line (assuming format "Date: <date>")
                if "Date:" in date_line:
                    last_refresh_date = date_line.split("Date:")[1].strip()
                    return jsonify({"Date": last_refresh_date}), 200
        return jsonify({"Error": "Date not found"}), 404
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    
#Serve static files like CSS and JS
@app.route('/static')
def serve_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)
    
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
