const API_BASE = "https://YOUR_API_GATEWAY_URL_HERE";

let currentUser = null;

/* ---------------------------
   NAVIGATION
----------------------------*/
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

/* ---------------------------
   AUTH PLACEHOLDER (Cognito later)
----------------------------*/
async function login(email, password) {
  // This will connect to Cognito in Phase 2
  console.log("Logging in user:", email);

  // temporary mock
  currentUser = { email };
  showPage("dashboard");
}

/* ---------------------------
   LOAD REAL DATA (API READY)
----------------------------*/
async function loadDashboard() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    const data = await res.json();

    document.getElementById("risk").innerText = data.risk;
    document.getElementById("alerts").innerText = data.alerts;
  } catch (err) {
    console.error("API not connected yet", err);
  }
}
