import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h2>SyncBoard</h2>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 18px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "100px 20px",
          background: "#f9fafb",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Real-Time Collaborative Whiteboard
        </h1>

        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "auto" }}>
          SyncBoard allows multiple users to draw, brainstorm, and collaborate
          together on a shared whiteboard in real-time from anywhere.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: "30px",
            padding: "14px 30px",
            fontSize: "16px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2>Features</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "250px" }}>
            <h3>Real-Time Collaboration</h3>
            <p>
              Multiple users can draw on the board simultaneously and see
              updates instantly.
            </p>
          </div>

          <div style={{ maxWidth: "250px" }}>
            <h3>Drawing Tools</h3>
            <p>
              Use different brush sizes, colors, and shapes to express your
              ideas visually.
            </p>
          </div>

          <div style={{ maxWidth: "250px" }}>
            <h3>Zoom & Pan</h3>
            <p>
              Navigate large boards easily with zoom and pan functionality.
            </p>
          </div>

          <div style={{ maxWidth: "250px" }}>
            <h3>Persistent Boards</h3>
            <p>
              Save your boards in the database and access them anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          background: "#111",
          color: "white",
        }}
      >
        <p>Built with MERN Stack • Nandish Rao A</p>
      </footer>
    </div>
  );
};

export default LandingPage;