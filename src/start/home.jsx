import { Link } from "react-router-dom";
import "../style.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <h1>VibeCord</h1>
        </div>
      </header>

      <main className="home-main">
        <h2 className="home-title">IMAGINE A PLACE TO CONNECT TO YOUR PEERS.....</h2>
        <p className="home-description">
          VibeCord is a modern, Discord-inspired communication platform designed to deliver smooth, real-time user interaction with a sleek and intuitive interface. Whether you're building a community or just chatting with friends, VibeCord provides the foundation for effortless conversation.

          Connect. Communicate. Vibe.
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
