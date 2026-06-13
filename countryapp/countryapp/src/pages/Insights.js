import { useEffect, useState } from "react";
import { getAllCountries } from "../services/api";

function Insights() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  if (countries.length === 0) {
    return <h2>Loading Insights...</h2>;
  }

  const mostPopulated = [...countries].sort(
    (a, b) => b.population - a.population
  )[0];

  const leastPopulated = [...countries].sort(
    (a, b) => a.population - b.population
  )[0];

  const largestCountry = [...countries].sort(
    (a, b) => (b.area || 0) - (a.area || 0)
  )[0];

  const top10Population = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);

  return (
    <div className="insights-page">
      <h1>🌍 Global Insights</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Countries</h3>
          <p>{countries.length}</p>
        </div>

        <div className="stat-card">
          <h3>Most Populated</h3>
          <p>{mostPopulated.name.common}</p>
        </div>

        <div className="stat-card">
          <h3>Least Populated</h3>
          <p>{leastPopulated.name.common}</p>
        </div>

        <div className="stat-card">
          <h3>Largest Country</h3>
          <p>{largestCountry.name.common}</p>
        </div>
      </div>

      <h2> Top 10 Most Populated Countries</h2>

      <ol className="ranking-list">
        {top10Population.map((country) => (
          <li key={country.cca3}>
            {country.name.common}   —   {" "}
            {country.population.toLocaleString()}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Insights;