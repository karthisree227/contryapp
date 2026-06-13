import { useEffect, useState } from "react";
import { getAllCountries } from "../services/api";

function Compare() {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const selected1 = countries.find(
    (c) => c.cca3 === country1
  );

  const selected2 = countries.find(
    (c) => c.cca3 === country2
  );

  return (
    <div className="compare-page">
      <h1>🌍 Compare Countries</h1>

      <div className="compare-selects">
        <select
          value={country1}
          onChange={(e) => setCountry1(e.target.value)}
        >
          <option value="">Select Country 1</option>

          {countries.map((country) => (
            <option
              key={country.cca3}
              value={country.cca3}
            >
              {country.name.common}
            </option>
          ))}
        </select>

        <select
          value={country2}
          onChange={(e) => setCountry2(e.target.value)}
        >
          <option value="">Select Country 2</option>

          {countries.map((country) => (
            <option
              key={country.cca3}
              value={country.cca3}
            >
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {/* Flight Route */}
      {selected1 && selected2 && (
        <div className="flight-route">

          <div className="country-side">
            <img
              src={selected1.flags?.png}
              alt={selected1.name?.common}
              className="compare-flag"
            />

            <h3>{selected1.name.common}</h3>
          </div>

          <div className="route-center">
            <div className="route-line">
              <span className="plane-icon">✈️</span>
            </div>

            <div className="compare-globe">
              
            </div>
          </div>

          <div className="country-side">
            <img
              src={selected2.flags?.png}
              alt={selected2.name?.common}
              className="compare-flag"
            />

            <h3>{selected2.name.common}</h3>
          </div>

        </div>
      )}

      {/* Comparison Table */}
      {selected1 && selected2 && (
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>{selected1.name.common}</th>
                <th>{selected2.name.common}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Capital</td>
                <td>{selected1.capital?.[0] || "N/A"}</td>
                <td>{selected2.capital?.[0] || "N/A"}</td>
              </tr>

              <tr>
                <td>Region</td>
                <td>{selected1.region}</td>
                <td>{selected2.region}</td>
              </tr>

              <tr>
                <td>Population</td>
                <td>
                  {selected1.population.toLocaleString()}
                </td>
                <td>
                  {selected2.population.toLocaleString()}
                </td>
              </tr>

              <tr>
                <td>Country Code</td>
                <td>{selected1.cca2}</td>
                <td>{selected2.cca2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Compare;