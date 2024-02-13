import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage.js';
import DataDisp from './DataDisp.js';

export const Routing = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path="/data" element={<DataDisp />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Routing;