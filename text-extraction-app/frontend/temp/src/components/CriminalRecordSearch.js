import React, { useState } from 'react';

function Records() {
  const [records, setRecords] = useState([]);
  const [searchType, setSearchType] = useState('aadhar'); // Default search type
  const [searchValue, setSearchValue] = useState('');

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/fetch-criminal-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchType, searchValue }),
      });
      const data = await response.json();
      setRecords(data.criminalRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <div>
      <h1>Fetch Criminal Records</h1>
      <div>
        <label>Select Search Type:</label>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="aadhar">Aadhar Card Number</option>
          <option value="pan">PAN Card Number</option>
          <option value="license">Driving License Number</option>
        </select>
      </div>
      <div>
        <label>Search Value:</label>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <button onClick={fetchRecords}>Fetch Records</button>
      <div>
        <h2>Criminal Records:</h2>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record.criminal_record}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Records;
