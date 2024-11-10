// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Spinner } from './components/ui/spinner';
import ListYourBusinessPage from './pages/ListYourBusinessPage';
import VerificationPendingPage from './pages/VerificationPendingPage';
import BusinessRegistrationPage from './pages/BusinessRegistrationPage';
import DashboardPage from './pages/DashboardPage';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Spinner className="w-8 h-8 text-emerald-500" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list-your-business" element={<ListYourBusinessPage />} />
        <Route path="/register/business" element={<BusinessRegistrationPage />} />
        <Route path="/verification-pending" element={<VerificationPendingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/listings/:id"
          element={<ListingPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}