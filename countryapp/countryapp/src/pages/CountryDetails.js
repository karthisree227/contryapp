import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../services/api";

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);


const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("favorites")) || [];
  setFavorites(saved);
}, []);

const isFavorite = favorites.includes(code);

const toggleFavorite = () => {
  let updated;

  if (isFavorite) {
    updated = favorites.filter((c) => c !== code);
  } else {
    updated = [...favorites, code];
  }

  setFavorites(updated);
  localStorage.setItem("favorites", JSON.stringify(updated));
};





























  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountryByCode(code);
      setCountry(Array.isArray(data) ? data[0] : data);
    };

    fetchData();
  }, [code]);

  if (!country) {
    return <h2 className="loading">Loading...</h2>;
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const nativeName =
    country.name?.nativeName
      ? Object.values(country.name.nativeName)[0]?.common
      : "N/A";

  return (
    <div className="details-page fade-in">

      <button className="back-btn" onClick={() => navigate("/home")}>
        ⬅ Back to Home
      </button>

      <div className="details-card slide-up">

        <img
          src={country.flags?.png || country.flags?.svg}
          alt={country.name?.common}
          className="main-flag zoom-img"
        />
      

        <h1 className="country-title">
          {country.name?.common}
        </h1>

       <h2 className="official-name">
  {country.name.official}
</h2>

        <div className="info-grid">

          <p><b>Native Name:</b> {nativeName}</p>

          <p><b>Capital:</b> {country.capital?.[0] || "N/A"}</p>

          <p><b>Region:</b> {country.region || "N/A"}</p>

          <p><b>Sub Region:</b> {country.subregion || "N/A"}</p>

          <p><b>Population:</b>{" "}
            {country.population
              ? country.population.toLocaleString()
              : "N/A"}
          </p>

          <p><b>Area:</b> {country.area ? `${country.area.toLocaleString()} km²` : "N/A"}</p>

          <p><b>Languages:</b> {languages}</p>

          <p><b>Currencies:</b> {currencies}</p>

          <p><b>Timezones:</b> {country.timezones?.join(", ") || "N/A"}</p>

          <p><b>Continents:</b> {country.continents?.join(", ") || "N/A"}</p>

          <p><b>Start of Week:</b> {country.startOfWeek || "N/A"}</p>

  <button
  className={`fav-btn ${isFavorite ? "active" : ""}`}
  onClick={toggleFavorite}
>
  {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
</button>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;




























