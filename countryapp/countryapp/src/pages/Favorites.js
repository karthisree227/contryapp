import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../services/api";

function Favorites() {
  const [countries, setCountries] = useState([]);
  const [favoriteCodes, setFavoriteCodes] = useState([]);

  const navigate = useNavigate();

  // LOAD FAVORITES FROM LOCALSTORAGE
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteCodes(fav);
  }, []);

  // FETCH ALL COUNTRIES
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };

    fetchData();
  }, []);

  // FILTER FAVORITE COUNTRIES
  const favCountries = countries.filter((c) =>
    favoriteCodes.includes(c.cca3)
  );

  // REMOVE FAVORITE
  const removeFavorite = (code) => {
    const updated = favoriteCodes.filter((c) => c !== code);

    setFavoriteCodes(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="grid">
      {favCountries.length === 0 ? (
        <h2 style={{ color: "white", textAlign: "center" }}>
          No Favorites Added ⭐
        </h2>
      ) : (
        favCountries.map((country) => (
          <div
            key={country.cca3}
            className="card active-card"
            onClick={() => navigate(`/details/${country.cca3}`)}
          >
            <img
              src={country.flags?.png}
              alt={country.name.common}
            />

            <h3>{country.name.common}</h3>
            <p>{country.region}</p>






            {/* REMOVE BUTTON */}
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(country.cca3);
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;