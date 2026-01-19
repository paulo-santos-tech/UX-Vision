import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PortfolioAll from './pages/PortfolioAll';
import ProjectDetails from './pages/ProjectDetails';
import BlogAll from './pages/BlogAll';
import BlogPost from './pages/BlogPost';
import Microsaas from './pages/Microsaas';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ThankYou from './pages/ThankYou';
import NotFound from './pages/NotFound';

const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToAnchor />
      <div className="min-h-screen flex flex-col bg-bg-dark text-white font-sans selection:bg-neon-purple selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioAll />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/blog" element={<BlogAll />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/microsaas" element={<Microsaas />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/thank-you" element={<ThankYou />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;