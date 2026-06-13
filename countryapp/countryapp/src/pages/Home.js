import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCountries } from "../services/api";
import DidYouKnow from "../components/DidYouKnow";

function Home() {
  const [countries, setCountries] = useState([]);
  const [favoriteCodes, setFavoriteCodes] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // ================= FAVORITES LOAD =================
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavoriteCodes(saved);
  }, []);

  // ================= FAVORITES SAVE =================
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favoriteCodes)
    );
  }, [favoriteCodes]);

  // ================= SEARCH NAVIGATION =================
  useEffect(() => {
    if (location.state?.countryCode) {
      const code = location.state.countryCode;

      setTimeout(() => {
        const el = document.getElementById(code);

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          el.classList.add("active-card");

          setTimeout(() => {
            el.classList.remove("active-card");
          }, 2000);
        }
      }, 300);
    }
  }, [location.state]);

  // ================= FETCH COUNTRIES =================
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };

    fetchData();
  }, []);

  // ================= FAVORITES =================
  const toggleFavorite = (code) => {
    setFavoriteCodes((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  // ================= BACK TO TOP =================
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= REGION FILTER =================
  let displayedCountries = countries;

  if (location.state?.region) {
    displayedCountries = countries.filter(
      (country) =>
        country.region === location.state.region
    );
  }

  return (
    <div className="home-wrapper">
      {/* Back To Top */}
      <button
        className="back-to-top-btn"
        onClick={scrollToTop}
      >
        ⬆ Back to Top
      </button>

      {/* Did You Know */}
      <DidYouKnow />

      {/* Region Heading */}
      {location.state?.region && (
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20px",
          }}
        >
          🌍 {location.state.region} Countries
        </h2>
      )}

      {/* Countries Grid */}
      <div className="grid">
        {displayedCountries.map((country) => {
          const isFav = favoriteCodes.includes(
            country.cca3
          );

          return (
            <div
              key={country.cca3}
              id={country.cca3}
              className={`card ${
                isFav ? "active-card" : ""
              }`}
              onClick={() =>
                navigate(
                  `/details/${country.cca3}`
                )
              }
            >
              <img
                src={country.flags?.png}
                alt={country.name?.common}
              />

              <h3>{country.name?.common}</h3>

              <p>{country.region}</p>

              <button
                className={`fav-btn ${
                  isFav ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(country.cca3);
                }}
              >
                {isFav
                  ? "★ Favorited"
                  : "☆ Add Favorite"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;