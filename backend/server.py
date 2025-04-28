from flask import Flask, request
from flask_cors import CORS

from agent import Model
import random
import fitz
from database import database
from syllabus_parser import SyllabusParser
 

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Handling multiple users
server_capacity = 5
models = [None] * server_capacity
next_pos = 0
session_id_dict = dict()
session_id_dict[-1] = None
session_id_storage = [-1] * server_capacity

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get-session-id", methods=["POST"])
def return_session_id():
    global next_pos
    user_id = request.form.get("userID")
    session_id_dict[session_id_storage[next_pos]] = None
    new_id = random.randint(0, 2147483647)
    session_id_dict[new_id] = next_pos
    session_id_storage[next_pos] = new_id
    models[next_pos] = Model(user_id)
    next_pos = (next_pos + 1) % server_capacity

    return str(new_id)


# Setting up chat returns
@app.route("/chat", methods=["POST"])
def get_response():
    text = request.form.get("text")
    session_id = int(request.form.get("session-id"))
    if session_id in session_id_dict:
        model_num = session_id_dict[session_id]
        if model_num == None:
            return "Session time out..."
        relevant_model = models[model_num]
        ret = relevant_model.get_response(text)
        return ret
    else:
        return "Session not found..."

@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    userID = request.form.get("userID")
    if file.filename == '':
        return 'No selected file'
    if file:
        pdf_data = file.read()
        doc = fitz.open(stream=pdf_data, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        activities, goals = SyllabusParser.pull_information(text)
        for goal in goals:
            database.set_goals(self.user_id, goal)
        for activity in activities:
            database.set_activities(self.user_id, activity)
        database.set_syllabus(userID, text)
        ret_text = "PDF successfully uploaded. Goals identified as: \n"
        for goal in goals:
            ret_text += goal
            ret_text += "\n"
        ret_text += "Classtimes found as: \n"
        for activity in activities:
            ret_text += activity
            ret_text += "\n"
        return ret_text
    
@app.route('/create_user', methods = ['POST'])
def create_user():
    print("attempt to create new user...")
    userID = request.form.get("userID")
    database.create_user(userID)
    return "Account created..."

    
@app.route('/clear_data', methods=['POST'])
def clear_data():
    userID = request.form.get("userID")
    database.clear_user_data(userID)


if __name__ == '__main__':
    app.run(debug=True)
