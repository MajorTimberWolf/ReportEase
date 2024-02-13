import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

const ResultPage = () => {
  const location = useLocation();
  const { result, ipcSuggestions } = location.state || {
    result: "",
    ipcSuggestions: [],
  };

  const [name, setName] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [criminalRecord, setCriminalRecord] = useState("");

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

  return (
    <div className="bg-gray-900 p-4 rounded-md shadow-md">
      <h1 className="text-3xl font-normal text-white">Text Extraction Results</h1>

      {/* Extracted Text Box */}
      <div className="mt-4 bg-gray-850 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-white">Extracted Text:</h2>
        <div className="overflow-auto" style={{ maxHeight: "200px" }}>
          <pre className="text-white">{result}</pre>
        </div>
      </div>

      {/* IPC Suggestions Box */}
      {ipcSuggestions.length > 0 && (
        <div className="mt-4 bg-gray-850 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-white">
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
      <div className="mt-4 bg-gray-850 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-white">Criminal Records Search:</h2>
        <p>Dummy CCTNS</p>
        <div>
          <label className="text-white">Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white">Aadhar Card: </label>
          <input
            type="text"
            value={aadharCard}
            onChange={(e) => setAadharCard(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>Search Records</button>
        <div>
          <h2 className="text-xl font-semibold text-white">Criminal Record:</h2>
          <p className="text-white">{criminalRecord}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;