import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Search from "./pages/Search";
import CountryDetails from "./pages/CountryDetails";
import Compare from "./pages/Compare";
import Insights from "./pages/Insights";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <Header
        toggleTheme={toggleTheme}
        dark={dark}
      />

      <main className="main-content">
        
<Routes>
  <Route path="/" element={<Welcome dark={dark} />} />

          <Route path="/home" element={<Home />} />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/compare"
            element={<Compare />}
          />

          <Route
            path="/insights"
            element={<Insights />}
          />

          <Route
            path="/details/:code"
            element={<CountryDetails />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;