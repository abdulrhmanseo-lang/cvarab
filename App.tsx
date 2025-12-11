import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Templates from './pages/Templates';
import Auth from './pages/Auth';
import JobGuarantee from './pages/JobGuarantee';
import JobsTracking from './pages/JobsTracking';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/job-guarantee" element={<JobGuarantee />} />
          <Route path="/dashboard/jobs-tracking" element={<JobsTracking />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;