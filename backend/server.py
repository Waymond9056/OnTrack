from flask import Flask, request
from syllabus import parse_suggestions
from agent import Model
import random

# Handling multiple users
server_capacity = 5
models = [None] * server_capacity
next_pos = 0
session_id_dict = dict()
session_id_dict[-1] = None
session_id_storage = [-1] * server_capacity

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get-session-id")
def return_session_id():
    global next_pos
    session_id_dict[session_id_storage[next_pos]] = None
    new_id = random.randint(0, 2147483647)
    session_id_dict[new_id] = next_pos
    session_id_storage[next_pos] = new_id
    models[next_pos] = Model()
    next_pos = (next_pos + 1) % server_capacity
    return str(new_id)

# Setting up chat returns
@app.route("/chat", methods=["POST"])
def get_response():
    text = request.form.get("text")
    session_id = request.form.get("session-id")
    if session_id in session_id_dict:
        model_num = session_id_dict[session_id]
        if model_num == None:
            return "Session time out..."
        relevant_model = models[model_num]
        return relevant_model.get_response(text)
    else:
        return "Session not found..."

@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return {'error': 'No file part'}, 400

    file = request.files['file']

    if file.filename == '':
        return {'error': 'No selected file'}, 400

    if file:
        return parse_suggestions(file)

if __name__ == '__main__':
    app.run(debug=True)