from flask import Flask, request
from syllabus import parse_suggestions

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

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