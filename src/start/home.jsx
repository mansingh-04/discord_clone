import { Link } from "react-router-dom";
import "../style.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <h1>Discordly</h1>
        </div>
      </header>

      <main className="home-main">
        <h2 className="home-title">IMAGINE A PLACE...</h2>
        <p className="home-description">
          ...where you can belong to a school club, a gaming group, or a worldwide art community.
          Where just you and a handful of friends can spend time together. A place that makes it
          easy to talk every day and hang out more often.
        </p>
        <div className="home-buttons">
          <Link to="/Register">
            <button className="btn btn-primary">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-outline">Login</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
