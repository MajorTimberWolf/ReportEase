# ReportEase: An AI-based FIR Analysis Project

ReportEase is an Automated Legal Insight Project that uses Mistral AI, an open source Large Language Model (LLM) finetuned on IPC & CrPC Datasets, to analyze First Information Reports (FIRs) and generate insightful reports. The application also allows users to search the Crime and Criminal Tracking Network and Systems (CCTNS) database for relevant information.
## Presentation Link: [Presentation](https://tome.app/abhinavs-workspace-d2a/team-gallants-presentation-clrg93wpo3dqkmt62zss5ls4c)
## Features

- Upload PDF or image files of FIRs and extract the text using optical character recognition (OCR) with the help of Tesseract.
- Generate IPC and CrPC suggestions based on the situation extracted from the given prompt.
- Download the generated report as PDF files for further use or sharing.
- Search the CCTNS database using accused name and valid identity proof and get the results stating whether they are a repeating offender.
- Visualize the data of CCTNS in a dashboard format with the help of graphs and charts.

## Installation

To run the project locally, follow these steps:

- Clone the repository using `git clone https://github.com/Varun-2538/RJPOLICE_HACK_1212_Gallants_4`
- Navigate to the `text-extraction-app` directory and install the required Python packages using `pip install -r requirements.txt`
- Navigate to the `frontend` directory and install the required Node.js packages using `npm install`
-  Navigate to the `backend` directory and install the required Node.js packages using `npm install`
- Verify that all the installations have been completed successfully.
- Navigate to the `backend` directory and start the Node.js server using `node server.js`
- Navigate to the `text-extraction-app` directory and start the Python app using `python app.py`
- Navigate to the `frontend` directory and start the React.js app using `npm start`

## Usage

To use the web application, follow these steps:

- If you followed all the installation steps correctly, the website should open in your browser at `http://localhost:3000`.
- On the homepage, you will see a bar where you can upload the PDF or image file of an FIR. Click on the `Choose File` button and select the file you want to upload.
- After the upload is complete, the application will extract the text from the file and display it on the screen. You can also edit the text if needed.
- Click on the `Generate Report` button to generate the report based on the extracted text. The report will include the summary, keywords, entities, sentiment, and categories of the FIR.
- You will be redirected to another page where you can view the report and download it as a PDF file by clicking on the `Download Report` button.
- To search the CCTNS database, click on the `CCTNS Search` button on the navigation bar. You will see a search box where you can enter keywords or filters to query the database. Click on the `Search` button to get the results in a tabular format.
- To visualize the data, click on the `Data Visualization` button on the navigation bar. You will see various charts and graphs that show the distribution and trends of the data.

## Technology Used
- Frontend: React.js, Tailwind CSS, Chart.js, Axios API
- Backend: Node.js, Flask API, Express.js
- OCR and Text Extraction: Tesseract.js for OCR, Pdf-Poppler for converting PDF pages into images for OCR, Text-Extraction model for extracting text from images.
- LLM for Suggestions: MistralAI, Docker Image, Autotrain and Inference Client.
## Acknowledgements

- This project uses [Mistral AI](https://mistral.ai/), a natural language processing model developed by Mistral Technologies

---
