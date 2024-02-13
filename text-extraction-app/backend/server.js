const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfPoppler = require('pdf-poppler');
const Tesseract = require('tesseract.js');
const axios = require('axios');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());
const port = 3000;

// Function to extract text from PDF using Tesseract with parallel processing
async function extractTextFromPDF(pdfPath, outputDirectory) {
    let opts = {
        format: 'png',
        out_dir: outputDirectory,
        out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
        dpi: 300
    };

    await pdfPoppler.convert(pdfPath, opts);

    const files = fs.readdirSync(outputDirectory);
    const ocrPromises = files
        .filter(file => file.includes(path.basename(pdfPath, path.extname(pdfPath))))
        .map(file => {
            const outputImagePath = path.join(outputDirectory, file);
            return Tesseract.recognize(outputImagePath, 'eng+hin')
                .then(result => {
                    fs.unlinkSync(outputImagePath); // Delete image after processing
                    return result.data.text;
                });
        });

    const ocrResults = await Promise.all(ocrPromises);
    return ocrResults.join('\n');
}

// Endpoint to handle file upload and text extraction
app.post('/extract', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const pdfPath = req.file.path;
    const outputDirectory = path.join(__dirname, 'output');

    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    try {
        let extractedText = '';

        if (fileExtension === '.pdf') {
            extractedText = await extractTextFromPDF(pdfPath, outputDirectory);
        } else if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
            const { data: { text } } = await Tesseract.recognize(pdfPath, 'eng+hin');
            extractedText = text;
        } else {
            return res.status(400).send('Unsupported file format.');
        }

        // Send the extracted text to the Flask API (if needed)
        try {
            const flaskResponse = await axios.post(
                "http://127.0.0.1:5000/suggest_ipc", // Replace with your Flask server URL
                { extracted_text: extractedText }
            );

            console.log("IPC Suggestions:", flaskResponse.data.ipc_suggestions);
            res.json({ result: extractedText, ipcSuggestions: flaskResponse.data.ipc_suggestions });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ result: error.message });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        fs.unlinkSync(pdfPath); // Cleanup the uploaded PDF
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});