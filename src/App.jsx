import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import InfluencerGrid from './components/InfluencerGrid';
import InfluencerProfile from './components/InfluencerProfile';
import InfluencerDashboard from './components/InfluencerDashboard';
import StartupDashboard from './components/StartupDashboard';
import InfluencerFeed from './components/InfluencerFeed';
import StartupFeed from './components/StartupFeed';
import Pricing from './components/Pricing';
import AuthModal from './components/AuthModal';
import StarBackground from './common/StarBackground';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen aurora-bg transition-colors duration-300 relative">
      <StarBackground />
      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  user.userType === 'influencer' ? <Navigate to="/feed" /> : <Navigate to="/feed" />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/feed"
              element={
                user ? (
                  user.userType === 'influencer' ? <InfluencerFeed /> : <StartupFeed />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/discover"
              element={
                <div className="pt-20">
                  <InfluencerGrid />
                </div>
              }
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/influencer/:id" element={<InfluencerProfile />} />
            <Route path="/dashboard/influencer" element={<InfluencerDashboard />} />
            <Route path="/dashboard/startup" element={<StartupDashboard />} />
          </Routes>
        </AnimatePresence>
        <AuthModal />
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </motion.div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;