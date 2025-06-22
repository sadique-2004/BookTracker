import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import FeaturedBooks from "./pages/FeaturedBooks";
import BookDetailPage from "./pages/BookDetailPage";
import ReviewNotesPage from "./pages/ReviewNotesPage";
import SettingsPage from "./pages/SettingsPage";

const clerkFrontendApi =
  "pk_test_dGhvcm91Z2gtZ3VwcHktNzAuY2xlcmsuYWNjb3VudHMuZGV2JA";

function App() {
  return (
    <ThemeProvider>
      <ClerkProvider publishableKey={clerkFrontendApi}>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/feature" element={<FeaturedBooks />} />
                <Route path="/book/:id" element={<BookDetailPage />} />
                <Route path="/review" element={<ReviewNotesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ClerkProvider>
    </ThemeProvider>
  );
}

export default App;
