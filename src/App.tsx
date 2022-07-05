import {Bredcrums, Header} from './components';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {DataAnalysis} from './pages';
import {Dashboard} from './pages';
function App() {
    return (
        <div className="wrapper">
            <Header />
            <Bredcrums />
            <Routes>
                <Route path="/explore-data" element={<DataAnalysis />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
