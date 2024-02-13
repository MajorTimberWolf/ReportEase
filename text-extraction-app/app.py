import os
import csv
import re
import pandas as pd
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from model import generate_legal_suggestions  # Import the generate function from another module
import subprocess

app = Flask(__name__, static_folder='frontend/text-extraction-app/build')
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def load_ipc_dataset():
    """
    Loads the IPC dataset from a CSV file.

    Returns:
        A list of data rows (as lists) if the file is found, otherwise an error message.
    """

    dataset_filepath = "resources/fir-ipc_dataset.csv"

    try:
        with open(dataset_filepath, "r", encoding="utf-8") as csvfile:
            csv_reader = csv.reader(csvfile)
            headers = next(csv_reader)  # Store the headers for potential use later
            dataset_data = list(csv_reader)
            return dataset_data

    except FileNotFoundError:
        return "Can't find dataset, please try again"


@app.route('/suggest_ipc', methods=['POST'])
def suggest_ipc():
    try:
        data = request.json
        extracted_text = data.get('extracted_text', '')

        if not extracted_text:
            return jsonify({'error': 'No extracted text provided'}), 400

        # Generate IPC suggestions using the LLM model
        ipc_suggestions = generate_legal_suggestions(extracted_text)

        return jsonify({'ipc_suggestions': ipc_suggestions})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True)

# TODO: add routing to files, probably with flask. 
# TODO: Also uncomment IPC_Sections generation after filepath cleanup