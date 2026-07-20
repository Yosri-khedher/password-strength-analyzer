import { useState } from "react";
import "./App.css";
import ScoreGauge from "./compnants/ScoreGauge";
import { FiEye, FiEyeOff } from "react-icons/fi";
function App() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleAnalyze = async (pwd = password) => {
    if (!pwd.trim()) {
      alert("Please enter a password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://password-strength-analyzer-muj4.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: pwd,
        }),
      });

      const data = await response.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = () => {
    if (!result) return "#2563eb";

    if (result.score < 20) return "#ef4444";
    if (result.score < 40) return "#f97316";
    if (result.score < 60) return "#eab308";
    if (result.score < 80) return "#22c55e";

    return "#15803d";
  };
  const generatePassword = async () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allChars = lowercase + uppercase + numbers + symbols;

    let password = "";

    // Garantir au moins un caractère de chaque type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Compléter jusqu'à 16 caractères
    for (let i = 4; i < 16; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Mélanger les caractères
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(password);

    handleAnalyze(password);
  };
  return (
    <main className="container">

      <h1>Password Strength Analyzer</h1>

      <p className="subtitle">
        Analyze your password strength and improve your security.
      </p>

      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <button
        onClick={() => handleAnalyze()}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Password"}
      </button>
      <button
        className="generate-btn"
        onClick={generatePassword}
      >
        Generate Strong Password
      </button>
      {result && (
        <section className="result">

          <h2>Analysis Result</h2>

          <ScoreGauge score={result.score} />

          <div className="cards">

            <div className="card">
              <h4>Score</h4>
              <p>{result.score}/100</p>
            </div>

            <div className="card">
              <h4>Strength</h4>
              <p>{result.strength}</p>
            </div>

            <div className="card">
              <h4>Crack Time</h4>
              <p>{result.crack_time}</p>
            </div>

          </div>

          <div className="section">
            <h3>Missing Criteria</h3>

            {result.missing.length > 0 ? (
              <ul>
                {result.missing.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="success">✔ No missing criteria</p>
            )}
          </div>

          <div className="section">
            <h3>Suggestions</h3>

            {result.suggestions.length > 0 ? (
              <ul>
                {result.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="success">✔ Great password!</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;