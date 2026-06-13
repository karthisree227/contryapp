import { Link } from "react-router-dom";

function Header({ toggleTheme, dark }) {
  return (
    <header className={`header ${dark ? "dark-header" : ""}`}>
      <div className="title-section">
        <h1 className="app-title">Country Explorer</h1>
      </div>

      <nav>
        <Link to="/">Welcome</Link>

        <Link to="/home">Home</Link>

        <Link to="/search">Search</Link>

        <Link to="/favorites">Favorites</Link>

        <Link to="/insights">Insights</Link>

        <Link to="/compare">country-matchup</Link>

        <Link to="/about">About</Link>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;