const observations = [
  { community: "Tamale-East", farm: "FARM-010", signal: "rain_delay", severity: 7, ts: new Date().toISOString() },
  { community: "Kigali-Hills", farm: "FARM-092", signal: "heat_stress", severity: 6, ts: new Date().toISOString() },
];

const feed = document.getElementById("feed");
const alertBox = document.getElementById("alert-box");
const matchBox = document.getElementById("match-box");
const form = document.getElementById("obs-form");

function renderFeed() {
  feed.innerHTML = "";
  observations.slice().reverse().forEach((obs) => {
    const li = document.createElement("li");
    li.textContent = `${obs.community} | ${obs.farm} | ${obs.signal} | severity ${obs.severity}/10`;
    feed.appendChild(li);
  });
}

function computeAlert() {
  const recent = observations.slice(-5);
  const avg = recent.reduce((sum, o) => sum + Number(o.severity), 0) / recent.length;
  const floodSignals = recent.filter((o) => o.signal === "flood_marker").length;

  if (avg >= 7 || floodSignals >= 2) {
    alertBox.className = "alert";
    alertBox.textContent = `Early Warning: High climate risk detected (confidence: medium). Suggested action: deploy drainage checks, stagger planting windows, and coordinate seed protection.`;
  } else {
    alertBox.className = "ok";
    alertBox.textContent = "Risk level stable. Continue observation logging to improve collective memory quality.";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  observations.push({
    community: document.getElementById("community").value.trim(),
    farm: document.getElementById("farm").value.trim(),
    signal: document.getElementById("signal").value,
    severity: Number(document.getElementById("severity").value),
    ts: new Date().toISOString(),
  });
  renderFeed();
  computeAlert();
  form.reset();
});

document.getElementById("match-btn").addEventListener("click", () => {
  const latest = observations[observations.length - 1];
  const twins = [
    "Mbarara-West (Uganda)",
    "Kano-North (Nigeria)",
    "Nakuru-Lowlands (Kenya)",
    "Bobo-Dioulasso South (Burkina Faso)",
  ];
  const pick = twins[Math.floor(Math.random() * twins.length)];
  matchBox.className = "ok";
  matchBox.textContent = `Climate Twin for ${latest.community}: ${pick}. Shared strategy: shift planting start by 10-14 days and use short-cycle drought-tolerant seed.`;
});

renderFeed();
computeAlert();
