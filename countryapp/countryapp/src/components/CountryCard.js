import { Link } from "react-router-dom";

function CountryCard({ country }) {
  return (
    <div className="card">
      <Link
       to={`/details/${country.cca3}`}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <img
          src={country.flags?.png}
          alt={country.name?.common}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />

        <h3>
          {country.name?.common}
        </h3>
      </Link>

      <p>
        <strong>Capital:</strong>{" "}
        {country.capital?.[0] || "N/A"}
      </p>

      <p>
        <strong>Code:</strong>{" "}
        {country.cca2 || "N/A"}
      </p>

      <p>
        <strong>Region:</strong>{" "}
        {country.region || "N/A"}
      </p>
    </div>
  );
}

export default CountryCard;