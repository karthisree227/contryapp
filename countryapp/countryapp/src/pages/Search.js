import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../services/api";

function Search() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };

    fetchData();
  }, []);

  // SEARCH INPUT
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 6));
  };

  // COUNTRY SELECT
  const handleSelectCountry = (country) => {
    setQuery("");
    setSuggestions([]);

    navigate("/home", {
      state: {
        countryCode: country.cca3,
      },
    });
  };

  // CONTINENT CLICK
  const handleRegionClick = (region) => {
    navigate("/home", {
      state: {
        region,
      },
    });
  };

  return (
    <div className="search-page">
      <h1>Search Countries</h1>

      {/* SEARCH BOX */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Type country name..."
          value={query}
          onChange={handleChange}
        />

        {suggestions.length > 0 && (
          <div className="dropdown">
            {suggestions.map((country) => (
              <div
                key={country.cca3}
                className="dropdown-item"
                onClick={() =>
                  handleSelectCountry(country)
                }
              >
                <img
                  src={country.flags?.png}
                  alt={country.name.common}
                />

                <span>
                  {country.name.common}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>



<h2 className="map-title">
  🌍 Explore by Map
</h2>

<div className="continent-map">
  <div onClick={() => handleRegionClick("Asia")}>
    🌏 Asia
  </div>

  <div onClick={() => handleRegionClick("Europe")}>
    🌍 Europe
  </div>

  <div onClick={() => handleRegionClick("Africa")}>
    🌍 Africa
  </div>

  <div onClick={() => handleRegionClick("Americas")}>
    🌎 Americas
  </div>

  <div onClick={() => handleRegionClick("Oceania")}>
    🌏 Oceania
  </div>
</div>























    
       
     
    </div>
  );
}

export default Search;