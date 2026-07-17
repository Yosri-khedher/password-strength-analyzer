import "./ScoreGauge.css";

function ScoreGauge({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 20) return "#ef4444";
    if (score < 40) return "#f97316";
    if (score < 60) return "#facc15";
    if (score < 80) return "#22c55e";

    return "#15803d";
  };

  return (
    <div className="gauge">

      <svg width="180" height="180">

        <circle
          className="background-circle"
          cx="90"
          cy="90"
          r={radius}
        />

        <circle
          className="progress-circle"
          cx="90"
          cy="90"
          r={radius}
          stroke={getColor()}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />

      </svg>

      <div className="gauge-text">
        <h2>{score}</h2>
        <span>/100</span>
        <p className="gauge-strength">
    {score >= 80
        ? "Very Strong"
        : score >= 60
        ? "Strong"
        : score >= 40
        ? "Medium"
        : score >= 20
        ? "Weak"
        : "Very Weak"}
</p>
      </div>

    </div>
  );
}

export default ScoreGauge;