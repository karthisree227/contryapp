import { useNavigate } from "react-router-dom";

function Welcome({ dark }) {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-overlay">

        <div className="world-animation">

          {/* SATELLITE ORBIT */}
          

          {/* GLOBE / MOON */}
          <div className="rotating-globe">
            {dark ? "🌙" : "🌍 AK"}
          </div>

        </div>

        <h1 className="welcome-title">
          Country Explorer
        </h1>

        <p className="welcome-subtitle">
          Explore Countries • Compare Nations • Discover Facts
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/home")}
        >
          Start Exploring →
        </button>

      </div>
    </div>
  );
}

export default Welcome;