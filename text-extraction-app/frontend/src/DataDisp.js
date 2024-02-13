import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import jsPDF from "jspdf";
import Footer from "./Footer";

const DataDisp = () => {
  const location = useLocation();
  const { result, ipcSuggestions } = location.state || {
    result: "",
    ipcSuggestions: [],
  };

  const [name, setName] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [criminalRecord, setCriminalRecord] = useState("");

  const formatCriminalRecord = (record) => {
    // Split the record using the literal string "\n" instead of the line break character
    const lines = record.split("\\n");
    return lines.map((line, idx) => (
      <li key={idx} className="list-disc list-inside">
        {line}
      </li>
    ));
  };

  const handleSearch = () => {
    // Trim leading and trailing spaces from input values
    const trimmedName = name.trim();
    const trimmedAadharCard = aadharCard.trim();

    // Load the CSV file
    Papa.parse("/criminal_records.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const record = data.find(
          (row) =>
            row.name.trim() === trimmedName &&
            row.aadhar_card_number.trim() === trimmedAadharCard
        );

        if (record) {
          setCriminalRecord(record.criminal_record);
        } else {
          setCriminalRecord("Criminal record not found.");
        }
      },
    });
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(12); // Reduced font size to fit content within a single page

    const headerImage = new Image();
    headerImage.src = 'header1.png';

    headerImage.onload = function () {
      pdf.addImage(headerImage, 'PNG', 10, 10, 190, 40);

      const margin = 10;
      const pageHeight = pdf.internal.pageSize.height;
      const availableHeight = pageHeight - margin - 50;

      let yPos = 60;
      let lineSpacing = 8;

      const addTextWithPageBreak = (text) => {
        const lines = pdf.splitTextToSize(text, 180);
        lines.forEach((line) => {
          if (yPos + lineSpacing > availableHeight) {
            pdf.addPage();
            pdf.addImage(headerImage, 'PNG', 10, 10, 190, 40);
            yPos = 60;
          }
          pdf.text(line, margin, yPos);
          yPos += lineSpacing;
        });
      };

      addTextWithPageBreak("IPC Suggestions with reasons:");
      ipcSuggestions.forEach((suggestion) => {
        addTextWithPageBreak(`- ${suggestion}`);
      });

      yPos = yPos > 100 ? yPos : 100;
      addTextWithPageBreak("Criminal Record:");
      if (criminalRecord.includes("\n")) {
        const lines = criminalRecord.split("\\n");
        lines.forEach((line) => {
          addTextWithPageBreak(line);
        });
      } else {
        addTextWithPageBreak(criminalRecord);
      }

      pdf.save("report.pdf");
    };
  };

  return (
    <div className="bg-gray-900 px-36 shadow-md">
      <p className="text-xl font-bold mb-16 pt-3 text-orange-500 ">
        ReportEase
      </p>

      <h1 className="text-3xl font-normal text-white ">
        Text Extraction Results
      </h1>

      {/* Extracted Text Box */}
      <div className="mt-4 bg-gray-800 p-4 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Extracted Text:
        </h2>
        <div className="overflow-auto" style={{ maxHeight: "200px" }}>
          <pre className="text-white">{result}</pre>
        </div>
      </div>

      {/* IPC Suggestions Box */}
      {ipcSuggestions.length > 0 && (
        <div className="mt-4 bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold text-white mb-4">
            IPC Suggestions with reasons:
          </h2>
          <ul className="text-white">
            {ipcSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Criminal Records Search */}
      <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Criminal Records Search:
        </h2>
        <p className="text-white"> Sample Name: Neelam, Sample Aadhar: 876543210890</p>
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-white font-medium">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-md text-gray-700 w-full md:w-1/2 lg:w-1/3"
            placeholder="Enter name here"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="aadharCard" className="text-white font-medium">
            Aadhar Card:
          </label>
          <input
            id="aadharCard"
            type="text"
            value={aadharCard}
            onChange={(e) => setAadharCard(e.target.value)}
            className="p-2 rounded-md text-gray-700 w-full md:w-1/2 lg:w-1/3"
            placeholder="Enter Aadhar Card number"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={handleSearch}
        >
          Search Records
        </button>
        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-white">
            Criminal Record:
          </h2>
          {criminalRecord.includes("\n") ? (
            <ul className="text-white">
              {formatCriminalRecord(criminalRecord)}
            </ul>
          ) : (
            <p className="text-white mt-2">{criminalRecord}</p>
          )}
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-4 text-center pb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default DataDisp;
