import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PortfolioAll from "./pages/PortfolioAll";
import ProjectDetails from "./pages/ProjectDetails";
import BlogAll from "./pages/BlogAll";
import BlogPost from "./pages/BlogPost";
import Microsaas from "./pages/Microsaas";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

// ==============================================================================
// CONFIGURAÇÃO DO ANALYTICS (Cliente Específico)
// ==============================================================================
const analyticsSupabase = createClient(
  "https://gbnfoigyzcoccfdbgzmk.supabase.co",
  "sb_publishable_ZfZzn4PP-ajJ6S5c9JVrAg_4Tvvc8i4",
);

// Componente invisível que monitora a navegação
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackView = async () => {
      // 1. Rastreamento Supabase (Existente)
      try {
        await analyticsSupabase.from("page_analytics").insert([
          {
            path: location.pathname + location.search,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
          },
        ]);
      } catch (e) {
        console.error("Analytics Error", e);
      }

      // 2. Rastreamento Google Analytics 4 (Novo)
      // Substitua G-SEU_ID_AQUI pelo mesmo ID usado no index.html
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", "G-BCH2D01G5G", {
          page_path: location.pathname + location.search,
        });
      }
    };

    trackView();
  }, [location]);

  return null;
};

// Componente para rolar para o topo ou âncoras ao navegar
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToAnchor />
      <AnalyticsTracker />

      <div className="min-h-screen flex flex-col bg-bg-dark text-white font-sans selection:bg-neon-purple selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioAll />} />

            {/* Rota atualizada para usar slug */}
            <Route path="/project/:slug" element={<ProjectDetails />} />

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
