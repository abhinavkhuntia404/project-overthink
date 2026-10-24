import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CaseProvider } from './context/CaseContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollProgressSpine from './components/common/ScrollProgressSpine';
import EmotionMeterHUD from './components/telemetry/EmotionMeterHUD';
import Home from './pages/Home';
import Decode from './pages/Decode';
import Courtroom from './pages/Courtroom';
import RealityCheck from './pages/RealityCheck';
import CaseFiles from './pages/CaseFiles';
import About from './pages/About';
import Privacy from './pages/Privacy';
import InvestigationReception from './pages/InvestigationReception';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CaseProvider>
        <ScrollToTop />
        <ScrollProgressSpine />
        <EmotionMeterHUD />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/investigate" element={<InvestigationReception />} />
              <Route path="/decode" element={<Decode />} />
              <Route path="/courtroom" element={<Courtroom />} />
              <Route path="/reality-check" element={<RealityCheck />} />
              <Route path="/cases" element={<CaseFiles />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CaseProvider>
    </BrowserRouter>
  );
}
