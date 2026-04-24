function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
}

function mockLogin() {
  alert("Login system will connect to AWS Cognito next phase");
  showPage("dashboard");
}
